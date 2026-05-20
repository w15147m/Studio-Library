@extends('layouts.fullscreen-layout')

@section('content')
    <div id="react-root"></div>

    {{-- Auth Data for React --}}
    @auth
        <input type="hidden" id="accessToken" value="{{ auth()->user()->createToken('auth_token')->plainTextToken }}">
        <input type="hidden" id="authUser" value="{{ auth()->user()->toJson() }}">
    @else
        <input type="hidden" id="accessToken" value="">
        <input type="hidden" id="authUser" value="">
    @endauth
@endsection
