<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Audio;

class AudioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $audioDir = public_path('uploads/audio');
        if (!File::exists($audioDir)) {
            File::makeDirectory($audioDir, 0755, true);
            return;
        }

        $files = File::files($audioDir);

        foreach ($files as $file) {
            $ext = strtolower($file->getExtension());
            if (in_array($ext, ['mp3', 'wav', 'm4a', 'ogg'])) {
                $fileName = $file->getFilename();
                $audioId = pathinfo($fileName, PATHINFO_FILENAME);

                $title = str_replace('_', ' ', $audioId);
                $title = ucwords($title);

                Audio::firstOrCreate(
                    ['filename' => $fileName],
                    [
                        'title' => $title,
                    ]
                );
            }
        }
    }
}
