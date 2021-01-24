<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Dashboard0
 *
 * @author 
 */
class Dashboard0 extends CI_Controller {

    //almacena los datos enviados desde las peticiones ajax
    private $request;

    public function __construct() {
        parent::__construct();
        $this->load->helper(array('iotronics', 'iconst'));
        $this->load->library(array('session'));

        $this->request = json_decode(file_get_contents('php://input'));
    }
    
    public function nuevo_invitado() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("invitado_model");
            $retorno = $this->invitado_model->add($this->request->usuario, $this->request->clave, item_get("idusr"));
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function listar_invitado() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("invitado_model");
            $retorno = $this->invitado_model->listar(item_get("idusr"));
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function nuevo_lugar() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("lugar_model");
            $retorno = $this->lugar_model->add($this->request->descripcion, item_get("idusr"));
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function listar_lugar() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("lugar_model");
            $retorno = $this->lugar_model->listar(item_get("idusr"));
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function nuevo_topico() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("topico_model");
            $retorno = $this->topico_model->add($this->request->nombre, $this->request->etiqueta, $this->request->tipo, item_get("idusr"), $this->request->dispositivoid);
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function listar_topico() {
        $retorno = array();
        if (is_login()) {
            $this->load->model("topico_model");
            $retorno = $this->topico_model->listar(item_get("idusr"), item_get('tipousr'));
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function nuevo_dispositivo() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("dispositivo_model");
            $retorno = $this->dispositivo_model->add($this->request->serie, $this->request->lugarid);
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }

    public function listar_dispositivo() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("dispositivo_model");
            $retorno = $this->dispositivo_model->listar(item_get("idusr"));
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function listar_permiso() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("permiso_model");
            $retorno = $this->permiso_model->permisos($this->request->idlugar, $this->request->idinvitado, item_get("idusr"));
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function setear_permiso() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("permiso_model");
            $retorno = $this->permiso_model->permitir($this->request->permisoid, $this->request->invitadoid, $this->request->topicoid, $this->request->permitir);
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
    
    public function get_permiso() {
        $retorno = array();
        if (is_login() && (item_get("tipousr") == iconst_helper::USUARIO_ADMINISTRADOR)) {
            $this->load->model("permiso_model");
            $retorno = $this->permiso_model->get($this->request->invitadoid, $this->request->topicoid);
        } else {
            $retorno = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => 'No cuenta con los permisos necesarios');
        }
        echo json_encode($retorno);
    }
}
