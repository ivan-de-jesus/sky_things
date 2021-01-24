<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Topico_model
 *
 * @author 
 */
class Topico_model extends CI_Model{

    // variable (array) para almacenar la respuesta en el formato estatus, mensaje
    protected $data;

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper(array('iconst'));

        // carga util predeterminada..
        $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error desconocido");
    }
    
    public function add($nombre, $etiqueta, $tipo, $id_admin, $id_dispositivo) {
        $this->db->query('call topico_add(?,?,?,?,?)', array($nombre, $etiqueta, $tipo, $id_admin, $id_dispositivo));
        $tmp = $this->db->affected_rows();

        if ($tmp > 0) {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::OK, iconst_helper::MENSAJE => "Registro correcto");
        } else {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error al registrar");
        }

        return $this->data;
    }
    
    public function listar($idusr, $tipousr) {
        $this->data = array();
        $request = $this->db->query('call topico_list(?,?)', array($idusr, $tipousr));
        foreach ($request->result() as $row) {
            $this->data[] = array(
                'id' => $row->id,
                'nombre' => $row->nombre,
                'etiqueta' => $row->etiqueta,
                'estatus' => ($row->estatus == "0" ? false : true),
                'tipo' => $row->tipo,
                'isSubscribe' => false,
                'valor' => ''
            );
        }
        return $this->data;
    }

}
