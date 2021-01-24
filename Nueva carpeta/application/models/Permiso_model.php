<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Permiso_model
 *
 * @author 
 */
class Permiso_model extends CI_Model {

    // variable (array) para almacenar la respuesta en el formato estatus, mensaje
    protected $data;

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper(array('iconst'));

        // carga util predeterminada..
        $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error desconocido");
    }
    
    public function permisos($lugar_id, $invitado_id, $admin_id) {
        $this->data = array();
        $request = $this->db->query('call permisos_invitado(?,?,?)', array($lugar_id, $invitado_id, $admin_id));
        foreach ($request->result() as $row) {
            $this->data[] = array(
                'id' => $row->id,
                'etiqueta' => $row->etiqueta,
                'nombre' => $row->nombre,
                'permiso' => $row->permiso,
                'permitir' => $row->permitido
            );
        }
        return $this->data;
    }
    
    public function get($invitado_id, $topico_id) {
        $this->data = array();
        $request = $this->db->query('call permiso_get(?,?)', array($invitado_id, $topico_id));
        foreach ($request->result() as $row) {
            $this->data = array(
                'id' => $row->id,
                'etiqueta' => $row->etiqueta,
                'nombre' => $row->nombre,
                'permiso' => $row->permiso,
                'permitir' => $row->permitido
            );
        }
        return $this->data;
    }
    
    public function permitir($permiso_id, $invitado_id, $topico_id, $permitir) {
        $this->db->query('call permiso_set(?,?,?,?)', array($permiso_id, $invitado_id, $topico_id, $permitir));
        $tmp = $this->db->affected_rows();

        if ($tmp > 0) {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::OK, iconst_helper::MENSAJE => "Permiso modificado");
        } else {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error al modificar permiso");
        }

        return $this->data;
    }

}
