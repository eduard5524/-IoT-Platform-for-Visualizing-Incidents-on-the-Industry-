<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| API Routes of the application loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

/*********************
 * General App Routes.
 *********************/

/**
 * Authentication.
 */
Route::post('auth/login', 'General\AuthController@login');
Route::put('auth/password', 'General\AuthController@changePassword')->middleware('jwt-auth');
Route::post('auth/refresh', 'General\AuthController@refreshToken');
Route::post('auth/change-company', 'General\AuthController@changeCompany')->middleware('jwt-auth');

/**
 * Users Menu.
 */
Route::get('users', 'General\UsersController@getUsers')->middleware('jwt-auth', 'cache');
Route::get('users/{id}', 'General\UsersController@getUser')->middleware('jwt-auth', 'cache');
Route::get('users/data/{id}', 'General\UsersController@getUserData');//->middleware('jwt-auth', 'cache');
Route::post('users', 'General\UsersController@createUser')->middleware('jwt-auth');
Route::put('users', 'General\UsersController@editUser')->middleware('jwt-auth')->middleware('permissions');
Route::delete('users/{id}', 'General\UsersController@deleteUser')->middleware('jwt-auth')->middleware('permissions');

/**
 * Companies Menu.
 */
Route::get('companies', 'General\CompaniesController@getCompanies')->middleware('jwt-auth', 'cache');
Route::get('companies/{id}', 'General\CompaniesController@getCompany')->middleware('jwt-auth', 'cache');
Route::post('companies', 'General\CompaniesController@createCompany')->middleware('jwt-auth');
Route::put('companies', 'General\CompaniesController@editCompany')->middleware('jwt-auth')->middleware('permissions');
Route::delete('companies/{id}', 'General\CompaniesController@deleteCompany')->middleware('jwt-auth')->middleware('permissions');

/**
 * Roles Menu.
 */
Route::get('roles', 'General\RolesController@getRoles')->middleware('jwt-auth', 'cache');
Route::get('roles/{id}', 'General\RolesController@getRole')->middleware('jwt-auth', 'cache');
Route::post('roles', 'General\RolesController@createRole')->middleware('jwt-auth');
Route::put('roles', 'General\RolesController@editRole')->middleware('jwt-auth')->middleware('permissions');
Route::delete('roles/{id}', 'General\RolesController@deleteRole')->middleware('jwt-auth')->middleware('permissions');

/**
 * Modules
 */
Route::get('modules', 'General\ModuleController@getModules')->middleware('jwt-auth', 'cache');

/**
 * Applications
 */
Route::get('applications', 'General\ApplicationController@getApplications')->middleware('jwt-auth', 'cache');

/******************************
 * Neuraflow Application Routes
 ******************************/

/**
 * Incidences Routes
 */
Route::get('alarms', 'Neuraflow\AlarmController@index');

/**
 * PLC Devices Routes.
 */
Route::post('plcmethods', 'Neuraflow\PythonController@testConnection');

/**
 * Devices Menu Routes.
 */
Route::get('devices', 'Neuraflow\DeviceController@index');
Route::post('devices', 'Neuraflow\DeviceController@store');
Route::put('devices', 'Neuraflow\DeviceController@editDevice');
Route::delete('devices/{id}', 'Neuraflow\DeviceController@deleteDevice');

/**
 * Historical Incidences Routes.
 */
Route::get('historical-alarm-active', 'Neuraflow\HistoricalAlarmActiveController@index');
Route::get('historical-alarm-active/{id}', 'Neuraflow\HistoricalAlarmActiveController@showByAlarmId');

/**
 * Incidences Comments Routes.
 */
Route::get('comments', 'Neuraflow\CommentController@index');
Route::get('comments/{id}', 'Neuraflow\CommentController@showByAlarmId');
Route::post('comments', 'Neuraflow\CommentController@createComment');

/*******************************
 * Neuracore Application Routes.
 *******************************/

/**
 * Categories Menu Routes.
 */
Route::get('categories', 'Neuracore\CategoryController@index');
Route::post('categories', 'Neuracore\CategoryController@store');
Route::put('categories', 'Neuracore\CategoryController@update');
Route::delete('categories/{id}', 'Neuracore\CategoryController@destroy');

/**
 * Manufacturers Menu.
 */
Route::get('manufacturers', 'Neuracore\ManufacturerController@index');
Route::get('manufacturers/{id}', 'Neuracore\ManufacturerController@showById');
Route::post('manufacturers', 'Neuracore\ManufacturerController@store');
Route::put('manufacturers', 'Neuracore\ManufacturerController@update');
Route::delete('manufacturers/{id}', 'Neuracore\ManufacturerController@destroy');

/**
 * Families Menu Routes.
 */
Route::get('families', 'Neuracore\FamilyController@index');

/**
 * Products Menu Routes.
 */
Route::get('products', 'Neuracore\ProductController@index');
Route::get('products/{id}', 'Neuracore\ProductController@showById');
Route::get('products/category/{category}', 'Neuracore\ProductController@showByCategory');
Route::post('products', 'Neuracore\ProductController@store');
Route::put('products', 'Neuracore\ProductController@update');
Route::delete('products/{id}', 'Neuracore\ProductController@destroy');

/**
 * Providers Menu Routes.
 */
Route::get('providers', 'Neuracore\ProviderController@index');
Route::get('providers/{id}', 'Neuracore\ProviderController@showById');
Route::post('providers', 'Neuracore\ProviderController@store');
Route::put('providers', 'Neuracore\ProviderController@update');
Route::delete('providers/{id}', 'Neuracore\ProviderController@destroy');

/**
 * Wharehouse Menu Routes.
 */
Route::get('warehouse-location', 'Neuracore\WarehouseLocationController@index');
Route::get('warehouse-location/{id}', 'Neuracore\WarehouseLocationController@showById');
Route::post('warehouse-location', 'Neuracore\WarehouseLocationController@store');
Route::put('warehouse-location', 'Neuracore\WarehouseLocationController@update');
Route::delete('warehouse-location/{id}', 'Neuracore\WarehouseLocationController@destroy');

/**
 * Countries Routes.
 */
Route::get('countries', 'Neuracore\CountryController@index');
Route::get('countries/{id}', 'Neuracore\CountryController@showById');

/**
 * Purchase Menu Routes.
 */
Route::get('purchase-orders', 'Neuracore\PurchaseOrderController@index');
Route::get('purchase-orders/{id}', 'Neuracore\PurchaseOrderController@showById');
Route::get('purchase-orders/ordernum/{ordernum}', 'Neuracore\PurchaseOrderController@showByOrder');
Route::post('purchase-orders', 'Neuracore\PurchaseOrderController@store');
Route::put('purchase-orders', 'Neuracore\PurchaseOrderController@update');

/**
 * Purchase Detail Routes.
 */
Route::get('purchase-detail', 'Neuracore\PurchaseDetailController@index');
Route::get('purchase-detail/{id}', 'Neuracore\PurchaseDetailController@showById');
Route::get('purchase-detail/ordernum/{ordernum}', 'Neuracore\PurchaseDetailController@showByOrder');
Route::post('purchase-detail', 'Neuracore\PurchaseDetailController@store');
Route::put('purchase-detail', 'Neuracore\PurchaseDetailController@update');

/**
 * Files Routes.
 */
Route::post('files', 'Neuracore\FileController@store')->middleware('cache');
