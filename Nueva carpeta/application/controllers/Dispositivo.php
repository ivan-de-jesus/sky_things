<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Dispositivo
 *
 * @author 
 */
class Dispositivo extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper(array('url', 'iotronics'));
        $this->load->library(array('session'));
    }

    public function index() {
        if (is_login()) {
            $data['title'] = "IoTronics|Dispositivos";
            $this->load->view("dispositivo", $data);
        } else {
            redirect('login');
        }
    }

}
