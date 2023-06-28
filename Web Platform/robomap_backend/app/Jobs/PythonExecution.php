<?php

namespace App\Jobs;

use App\PythonProcess;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Device;

class PythonExecution implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $ip;
    protected $port;

    public function __construct($ip, $port)
    {
        $this->ip = $ip;
        $this->port = $port;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $python = new PythonProcess();
        $ip = $this->ip;
        $port = $this->port;

        $path = storage_path("plcmethods" . DIRECTORY_SEPARATOR . "plc-client.py");
        $params = $path . " ". $ip.":".$port;

        $python->setCommand("py $params");

        exec($python->getCommand() . " 2>&1", $out, $status);

        //return $status;
    }
}
