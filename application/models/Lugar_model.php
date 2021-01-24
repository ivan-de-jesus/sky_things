<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Lugar_model
 *
 * @author 
 */
class Lugar_model extends CI_Model {

    // variable (array) para almacenar la respuesta en el formato estatus, mensaje
    protected $data;

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper(array('iconst'));

        // carga util predeterminada..
        $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error desconocido");
    }

    public function add($descripcion, $id_admin) {
        $this->db->query('call lugar_add(?,?)', array($descripcion, $id_admin));
        $tmp = $this->db->affected_rows();

        if ($tmp > 0) {
            $data = array(iconst_helper::ESTATUS => iconst_helper::OK, iconst_helper::MENSAJE => "Registro correcto");
        } else {
            $data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error al registrar");
        }

        return $data;
    }

    public function listar($id_admin) {
        $datos = array();
        $request = $this->db->query('call lugar_list(?)', array($id_admin));
        foreach ($request->result() as $row) {
            $datos[] = array(
                'id' => $row->id,
                'descripcion' => $row->descripcion,
                'adminid' => $row->user_admin_id
            );
        }
        return $datos;
    }

}
