<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Dispositivo_model
 *
 * @author 
 */
class Dispositivo_model extends CI_Model {
    // variable (array) para almacenar la respuesta en el formato estatus, mensaje
    protected $data;

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper(array('iconst'));

        // carga util predeterminada..
        $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error desconocido");
    }
    
    public function add($serie, $id_lugar) {
        $this->db->query('call dispositivo_add(?,?)', array($serie, $id_lugar));
        $tmp = $this->db->affected_rows();

        if ($tmp > 0) {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::OK, iconst_helper::MENSAJE => "Registro correcto");
        } else {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error al registrar");
        }

        return $this->data;
    }
    
    public function listar($id_admin) {
        $this->data = array();
        $request = $this->db->query('call dispositivo_list(?)', array($id_admin));
        foreach ($request->result() as $row) {
            $this->data[] = array(
                'id' => $row->id,
                'serie' => $row->serie,
                'lugar' => $row->descripcion
            );
        }
        return $this->data;
    }
}
