<?php

return [
    'environment' => env('SAFEPAY_ENVIRONMENT', 'sandbox'),
    'api_key' => env('SAFEPAY_API_KEY'),
    'webhook_secret' => env('SAFEPAY_WEBHOOK_SECRET'),
    'redirect_url' => env('APP_URL') . '/checkout/callback', // The return URL after payment
    'cancel_url' => env('APP_URL') . '/checkout/cancel',     // If the user cancels the modal
];
