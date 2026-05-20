<?php

namespace App\Livewire\Pages\Profile;

use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

#[Layout('master-livewire')]
class ProfilePage extends Component
{
    use WithFileUploads;

    public bool $isEditing = false;
    public bool $isChangingPassword = false;

    public string $name = '';
    public string $email = '';
    public string $phone = '';
    public string $bio = '';
    public $photo = null;

    public string $currentPassword = '';
    public string $newPassword = '';
    public string $newPassword_confirmation = '';

    public function mount(): void
    {
        if (!Auth::check()) {
            $this->redirectRoute('signin', navigate: true);
            return;
        }

        $user = Auth::user();
        $this->name  = $user->name ?? '';
        $this->email = $user->email ?? '';
        $this->phone = $user->phone ?? '';
        $this->bio   = $user->bio ?? '';
    }

    public function startEditing(): void
    {
        $this->isEditing = true;
    }

    public function cancelEditing(): void
    {
        // Re-load from DB to discard unsaved changes
        $user = Auth::user();
        $this->name  = $user->name ?? '';
        $this->email = $user->email ?? '';
        $this->phone = $user->phone ?? '';
        $this->bio   = $user->bio ?? '';
        $this->photo = null;
        $this->isEditing = false;
    }

    public function save(): void
    {
        $user = Auth::user();

        $this->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:30'],
            'bio'   => ['nullable', 'string', 'max:500'],
            'photo' => ['nullable', 'image', 'max:2048'],
        ]);

        $data = [
            'name'  => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'bio'   => $this->bio,
        ];

        if ($this->photo) {
            // Delete old image if custom
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }
            $data['image'] = $this->photo->store('uploads/avatars', 'public');
        }

        $user->update($data);

        $this->photo = null;
        $this->isEditing = false;
        session()->flash('success', 'Profile updated successfully!');
    }

    public function changePassword(): void
    {
        $this->validate([
            'currentPassword'         => ['required', 'string'],
            'newPassword'             => ['required', 'string', 'min:8', 'confirmed'],
            'newPassword_confirmation' => ['required', 'string'],
        ]);

        $user = Auth::user();

        if (!\Illuminate\Support\Facades\Hash::check($this->currentPassword, $user->password)) {
            $this->addError('currentPassword', 'The current password is incorrect.');
            return;
        }

        $user->update(['password' => $this->newPassword]);

        $this->currentPassword = '';
        $this->newPassword = '';
        $this->newPassword_confirmation = '';
        $this->isChangingPassword = false;

        session()->flash('success', 'Password changed successfully!');
    }

    public function render()
    {
        return view('livewire.pages.Profile.profile-page', [
            'user' => Auth::user(),
        ]);
    }
}
