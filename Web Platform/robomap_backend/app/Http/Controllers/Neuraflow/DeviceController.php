<?php

namespace App\Http\Controllers\Neuraflow;

use App\Device;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use App\PythonProcess;
use App\Jobs\PythonExecution;
use Artisan;

use App\Http\Controllers\Controller;

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $devices = Device::orderBy('name','DESC')->get();

        if(!$devices){
            return null;
        }

        return $devices;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function createPythonJob($ip, $port, $name){
        PythonExecution::dispatch(Input::get('ip'), Input::get('port'));
        //$job = (new PythonExecution($ip, $port));
        //$jobId = dispatch($job)->onQueue($name); // this is variable job id

        Artisan::queue('queue:'.Input::get('name'));

     }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $device = Input::all();

        if (!isset($device)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newDevice = new Device();

        $newDevice->name = Input::get('name');
        $newDevice->ip = Input::get('ip');
        $newDevice->port = Input::get('port');
        $newDevice->protocol = Input::get('protocol');
        $newDevice->state = Input::get('state');
        $newDevice->created_at = Input::get('created_at');
        $newDevice->updated_at = Input::get('updated_at');

        if($newDevice->save()) {
            $this->createPythonJob(Input::get('ip'), Input::get('port'), Input::get('name'));
            return response()->json($newDevice)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);

    }
/***edit device method */
    public function editDevice(Request $request){

        $id = Input::get('id');
        $device = Device::find($id);
        if (!isset($device)) {
            return response(null, CODE_NOT_FOUND);
        }

        $name = Input::get('name');
        $port = Input::get('port');
        $state = Input::get('state');
        $protocol = Input::get('protocol');
        $ip = Input::get('ip');

        if (isset($name)) $device->name = $name;
        if (isset($port)) $device->port = $port;
        if (isset($state)) $device->state = $state;
        if (isset($protocol)) $device->protocol = $protocol;
        if (isset($ip)) $device->ip = $ip;

        if ($device->save()) {
            $this->createPythonJob(Input::get('ip'), Input::get('port'), Input::get('name'));
            return response()->json($device)->setStatusCode(CODE_OK);
        }
        return response(null, CODE_SERVER_ERROR);
    }

    public function deleteDevice($id){

        if (isset($id)) {
            $device = Device::find($id);
            if (!isset($device)) {
                return response(null, CODE_NOT_FOUND);
            }

            if ($device->delete()) {
                return response()->json($device)->setStatusCode(CODE_OK);
            }
            return response(null, CODE_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function show(Device $device)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function edit(Device $device)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Device $device)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function destroy(Device $device)
    {
        //
    }
}
