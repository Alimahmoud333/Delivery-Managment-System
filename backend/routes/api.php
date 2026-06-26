<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| CONTROLLERS
|--------------------------------------------------------------------------
*/

/* AUTH */
use App\Http\Controllers\Api\AuthController;

/* CUSTOMER */
use App\Http\Controllers\Api\Customer\AddressController;
use App\Http\Controllers\Api\Customer\OrderController;
use App\Http\Controllers\Api\Customer\PaymentController;
use App\Http\Controllers\Api\Customer\RatingController;
use App\Http\Controllers\Api\OtpController;




/* DRIVER */
use App\Http\Controllers\Api\Driver\DriverWorkflowController;

/* ADMIN */
use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\Admin\AdminOrderController;
use App\Http\Controllers\Api\Admin\AdminDriverController;

/* MANAGER */
use App\Http\Controllers\Api\Manager\ManagerOrderController;

/* FINANCE */
use App\Http\Controllers\Api\Finance\FinanceController;

/* SHARED */
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PaymentWebhookController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::post('/send-otp', [OtpController::class, 'send']);

Route::post('/verify-otp', [OtpController::class, 'verify']);
/*

|--------------------------------------------------------------------------
| STRIPE WEBHOOK
|--------------------------------------------------------------------------
*/

Route::post('/payment/webhook', [PaymentWebhookController::class, 'handle']);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | USER
    |--------------------------------------------------------------------------
    */

    Route::get('/user', fn(Request $request) => $request->user());

    Route::get('/profile', [AuthController::class, 'profile']);

    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | CHAT USERS (ALL ROLES)
    |--------------------------------------------------------------------------
    */

    Route::get('/chat-users', [MessageController::class, 'users']);

    /*
    ============================================================
    CUSTOMER ROUTES
    ============================================================
    */

    Route::middleware('role:customer')
        ->prefix('customer')
        ->group(function () {

            /*
            |--------------------------------------------------------------------------
            | ADDRESSES
            |--------------------------------------------------------------------------
            */

            Route::get('addresses', [AddressController::class, 'index']);

            Route::post('addresses', [AddressController::class, 'store']);

            Route::delete('addresses/{id}', [AddressController::class, 'destroy']);

            /*
            |--------------------------------------------------------------------------
            | ORDERS
            |--------------------------------------------------------------------------
            */

            Route::get('orders', [OrderController::class, 'index']);

            Route::post('orders', [OrderController::class, 'store']);

            Route::get('orders/{id}', [OrderController::class, 'show']);

            Route::post('orders/{id}/cancel', [OrderController::class, 'cancel']);

            /*
            |--------------------------------------------------------------------------
            | PAYMENT
            |--------------------------------------------------------------------------
            */

            Route::post(
                'payment/intent',
                [PaymentController::class, 'createIntent']
            );

            /*
            |--------------------------------------------------------------------------
            | RATING
            |--------------------------------------------------------------------------
            */

            Route::post('rate', [RatingController::class, 'rate']);
        });

    /*
    ============================================================
    DRIVER ROUTES
    ============================================================
    */

    Route::middleware('role:driver')
        ->prefix('driver')
        ->group(function () {

            Route::get(
                'deliveries',
                [DriverWorkflowController::class, 'myDeliveries']
            );

            Route::post(
                'deliveries/{id}/accept',
                [DriverWorkflowController::class, 'accept']
            );

            Route::post(
                'deliveries/{id}/start',
                [DriverWorkflowController::class, 'start']
            );

            Route::post(
                'deliveries/{id}/delivered',
                [DriverWorkflowController::class, 'delivered']
            );

            Route::post(
                'toggle-availability',
                [DriverWorkflowController::class, 'toggleAvailability']
            );

            Route::post(
                'update-profile',
                [DriverWorkflowController::class, 'updateProfile']
            );
        });

    /*
    ============================================================
    ADMIN ROUTES
    ============================================================
    */

    Route::middleware('role:admin')
        ->prefix('admin')
        ->group(function () {

            /*
            |--------------------------------------------------------------------------
            | USERS
            |--------------------------------------------------------------------------
            */

            Route::get('users', [AdminUserController::class, 'index']);

            Route::get('users/{id}', [AdminUserController::class, 'show']);

            Route::post('users', [AdminUserController::class, 'store']);

            Route::put('users/{id}', [AdminUserController::class, 'update']);

            Route::delete('users/{id}', [AdminUserController::class, 'destroy']);

            /*
            |--------------------------------------------------------------------------
            | ORDERS
            |--------------------------------------------------------------------------
            */

            Route::get('orders', [AdminOrderController::class, 'index']);

            Route::get('ratings', [AdminOrderController::class, 'ratings']);

            Route::get('stats', [AdminOrderController::class, 'stats']);

            Route::get(
                'orders-status',
                
                [AdminOrderController::class, 'ordersByStatus']
            );

            Route::get(
                'best-drivers',
                [AdminOrderController::class, 'bestDrivers']
            );

            Route::get(
                'top-drivers-orders',
                [AdminOrderController::class, 'topDriversByOrders']
            );

            /*
            |--------------------------------------------------------------------------
            | DRIVERS
            |--------------------------------------------------------------------------
            */

            Route::get('drivers', [AdminDriverController::class, 'index']);

            Route::post(
                'drivers/{id}/toggle',
                [AdminDriverController::class, 'toggleAvailability']
            );
        });

    /*
    ============================================================
    MANAGER ROUTES
    ============================================================
    */

    Route::middleware('role:manager')
        ->prefix('manager')
        ->group(function () {

            /*
            |--------------------------------------------------------------------------
            | DRIVERS
            |--------------------------------------------------------------------------
            */

            Route::get('drivers', function () {
                return \App\Models\Driver::with('user')->get();
            });

            /*
            |--------------------------------------------------------------------------
            | ORDERS
            |--------------------------------------------------------------------------
            */

            Route::get(
                'orders',
                [ManagerOrderController::class, 'index']
            );

            /*
            |--------------------------------------------------------------------------
            | ASSIGN DRIVER
            |--------------------------------------------------------------------------
            */

            Route::post(
                'assign-driver/{orderId}/{driverId}',
                [ManagerOrderController::class, 'assignDriver']
            );

            /*
            |--------------------------------------------------------------------------
            | CHANGE STATUS
            |--------------------------------------------------------------------------
            */

            Route::post(
                'orders/{id}/{status}',
                [ManagerOrderController::class, 'changeStatus']
            );

            /*
            |--------------------------------------------------------------------------
            | DELIVERIES
            |--------------------------------------------------------------------------
            */

            Route::get(
                'deliveries',
                [ManagerOrderController::class, 'deliveries']
            );
        });

    /*
    ============================================================
    FINANCE ROUTES
    ============================================================
    */

    Route::middleware('role:finance')
        ->prefix('finance')
        ->group(function () {

            Route::get(
                'payments',
                [FinanceController::class, 'payments']
            );

            Route::get(
                'revenue',
                [FinanceController::class, 'revenue']
            );
        });

    /*
    ============================================================
    MESSAGES (ALL ROLES)
    ============================================================
    */

    Route::prefix('messages')->group(function () {

        /*
        |--------------------------------------------------------------------------
        | GET ALL MY MESSAGES
        |--------------------------------------------------------------------------
        */

        Route::get('/', [MessageController::class, 'index']);

        /*
        |--------------------------------------------------------------------------
        | SEND MESSAGE
        |--------------------------------------------------------------------------
        */

        Route::post('/', [MessageController::class, 'store']);

        /*
        |--------------------------------------------------------------------------
        | CONVERSATION
        |--------------------------------------------------------------------------
        */

        Route::get(
            'conversation/{userId}',
            [MessageController::class, 'conversation']
        );

        /*
        |--------------------------------------------------------------------------
        | DELETE MESSAGE
        |--------------------------------------------------------------------------
        */

        Route::delete(
            '{id}',
            [MessageController::class, 'destroy']
        );
    });

    /*
    ============================================================
    NOTIFICATIONS (ALL ROLES)
    ============================================================
    */

    Route::prefix('notifications')->group(function () {

        Route::get('/', [NotificationController::class, 'index']);

        Route::post(
            '{id}/read',
            [NotificationController::class, 'markRead']
        );
    });
});