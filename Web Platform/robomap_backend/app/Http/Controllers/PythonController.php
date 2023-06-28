<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use App\PythonProcess;

use App\Device;
use Illuminate\Support\Facades\Input;
use Artisan;


class PythonController extends Controller
{

     function testConnection(){
    //    Artisan::call('queue:work', ['--queue' => Input::get('name')]);

        /*
        $process = new Process('python ../../../storage/plc-methods/plc-client.py');
        $process->run();
        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        return $process->getOutput();
        */
     //   return Input::get('name');



    /* $python = new PythonProcess();

        $path = storage_path("plcmethods" . DIRECTORY_SEPARATOR . "plc-client.py");
        $params = $path . " ". Input::get('ip').":".Input::get('port');

        $python->setCommand("py $params");

        exec($python->getCommand() . " 2>&1", $out, $status);

        return $status;*/

      /*  $path = storage_path("plcmethods" . DIRECTORY_SEPARATOR . "plc-client.py");
        $params = $path . " ". Input::get('ip').":".Input::get('port');
        $process = new Process(['py', $params]);
    $process->run();

    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }

    $data = $process->getOutput();

    dd($data);*/
   // C:\Users\eduar\Documents\Robomap\robomap_backend\storage\plcmethods\plc-client.py opc.tcp://Thinkpad-PHSP1HE:4840/'
    $path = storage_path("plcmethods");
    chdir($path);
    $output = shell_exec('py ' . $path . '/plc-client.py ' . Input::get('ip') . ':' . Input::get('port'));
    $output_arr = [
        "response" => $output
    ];
return json_encode($output_arr);




     }

}
