<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Topico
 *
 * @author 
 */
class Topico extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper(array('url', 'iotronics', "iconst"));
        $this->load->library(array('session'));
    }

    public function index() {
        if (is_login()) {
            if (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR) {
                $data['title'] = "IoTronics|Topicos";
                $this->load->view("topico", $data);
            } else {
                redirect('dashboard');
            }
        } else {
            redirect('login');
        }
    }

}
