# Generate violin-like WAV files using harmonics
# Violin timbre = fundamental + strong odd harmonics + some even harmonics

function New-ViolinWav {
    param(
        [string]$FilePath,
        [double]$Frequency,
        [double]$DurationSeconds = 3.0,
        [int]$SampleRate = 44100,
        [int]$BitsPerSample = 16
    )

    $numSamples = [int]($SampleRate * $DurationSeconds)
    $maxVal = 32767
    $amplitude = 0.7

    # Violin harmonic profile (relative amplitudes)
    # Real violin has strong fundamental, prominent 2nd-5th harmonics
    $harmonics = @(
        @{ Harmonic = 1; Amplitude = 1.0 },
        @{ Harmonic = 2; Amplitude = 0.72 },
        @{ Harmonic = 3; Amplitude = 0.55 },
        @{ Harmonic = 4; Amplitude = 0.38 },
        @{ Harmonic = 5; Amplitude = 0.25 },
        @{ Harmonic = 6; Amplitude = 0.15 },
        @{ Harmonic = 7; Amplitude = 0.10 },
        @{ Harmonic = 8; Amplitude = 0.06 }
    )

    # Generate samples
    $samples = New-Object Int16[] $numSamples

    for ($i = 0; $i -lt $numSamples; $i++) {
        $t = $i / $SampleRate
        $sample = 0.0

        foreach ($h in $harmonics) {
            $freq = $Frequency * $h.Harmonic
            $amp = $h.Amplitude
            $sample += $amp * [Math]::Sin(2.0 * [Math]::PI * $freq * $t)
        }

        # Normalize by sum of harmonic amplitudes
        $totalAmp = 0.0
        foreach ($h in $harmonics) { $totalAmp += $h.Amplitude }
        $sample = $sample / $totalAmp

        # Apply ADSR envelope for realistic attack/sustain/release
        $attackTime = 0.15
        $decayTime = 0.3
        $sustainLevel = 0.75
        $releaseTime = 0.4
        $releaseStart = $DurationSeconds - $releaseTime

        $envelope = 1.0
        if ($t -lt $attackTime) {
            # Attack - quick rise
            $envelope = $t / $attackTime
            $envelope = $envelope * $envelope  # exponential attack
        } elseif ($t -lt ($attackTime + $decayTime)) {
            # Decay
            $decayProgress = ($t - $attackTime) / $decayTime
            $envelope = 1.0 - (1.0 - $sustainLevel) * $decayProgress
        } elseif ($t -gt $releaseStart) {
            # Release - fade out
            $releaseProgress = ($t - $releaseStart) / $releaseTime
            $envelope = $sustainLevel * (1.0 - $releaseProgress)
            if ($envelope -lt 0) { $envelope = 0 }
        } else {
            # Sustain
            $envelope = $sustainLevel
        }

        # Add slight vibrato (characteristic of violin)
        $vibratoFreq = 5.5  # Hz
        $vibratoDepth = 0.003
        $vibrato = 1.0 + $vibratoDepth * [Math]::Sin(2.0 * [Math]::PI * $vibratoFreq * $t)

        $finalSample = $sample * $envelope * $amplitude * $vibrato * $maxVal
        $finalSample = [Math]::Max(-$maxVal, [Math]::Min($maxVal, [int]$finalSample))
        $samples[$i] = [Int16]$finalSample
    }

    # Write WAV file
    $dataSize = $numSamples * ($BitsPerSample / 8)
    $fileSize = 36 + $dataSize

    $stream = [System.IO.File]::Create($FilePath)
    $writer = New-Object System.IO.BinaryWriter($stream)

    # RIFF header
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("RIFF"))
    $writer.Write([int]$fileSize)
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("WAVE"))

    # fmt chunk
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("fmt "))
    $writer.Write([int]16)              # chunk size
    $writer.Write([Int16]1)             # PCM format
    $writer.Write([Int16]1)             # mono
    $writer.Write([int]$SampleRate)     # sample rate
    $writer.Write([int]($SampleRate * $BitsPerSample / 8))  # byte rate
    $writer.Write([Int16]($BitsPerSample / 8))  # block align
    $writer.Write([Int16]$BitsPerSample)

    # data chunk
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("data"))
    $writer.Write([int]$dataSize)

    foreach ($s in $samples) {
        $writer.Write([Int16]$s)
    }

    $writer.Close()
    $stream.Close()

    Write-Host "Created: $FilePath"
}

$basePath = "c:\Users\pique\Desktop\Nova pasta\som_de_violino"

# Sound 1: A4 (440 Hz) - La - open A string
Write-Host "Generating violin_la_440hz.wav ..."
New-ViolinWav -FilePath "$basePath\violin_la_440hz.wav" -Frequency 440.0 -DurationSeconds 3.5

# Sound 2: D4 (293.66 Hz) - Re - open D string  
Write-Host "Generating violin_re_293hz.wav ..."
New-ViolinWav -FilePath "$basePath\violin_re_293hz.wav" -Frequency 293.66 -DurationSeconds 3.5

# Sound 3: E5 (659.25 Hz) - Mi - open E string (highest)
Write-Host "Generating violin_mi_659hz.wav ..."
New-ViolinWav -FilePath "$basePath\violin_mi_659hz.wav" -Frequency 659.25 -DurationSeconds 3.5

Write-Host "`nAll 3 violin sounds generated successfully!"
