<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Invitado_model
 *
 * @author 
 */
class Invitado_model extends CI_Model {

    // variable (array) para almacenar la respuesta en el formato estatus, mensaje
    protected $data;

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper(array('iconst'));

        // carga util predeterminada..
        $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error desconocido");
    }

    public function login($usuario, $clave) {
        $this->db->trans_start();
        $this->db->query('call login_invitado(?,?,@respuesta,@identificador,@primerlogin)', array($usuario, $clave));
        $response = $this->db->query('select @respuesta as respuesta, @identificador as identificador, @primerlogin as primerlogin');
        $this->db->trans_complete();
        $tmp = $response->row();

        if ($tmp) {
            switch ($tmp->respuesta) {
                case iconst_helper::EXISTE:
                    $data = array(iconst_helper::ESTATUS => iconst_helper::OK, iconst_helper::MENSAJE => "Acceso concedido", "identificador" => $tmp->identificador, "primerlogin" => $tmp->primerlogin);
                    break;
                case iconst_helper::NA:
                    $data = array(iconst_helper::ESTATUS => iconst_helper::NA, iconst_helper::MENSAJE => "Usuario o clave erroneas");
                    break;
                default:
                    break;
            }
        } else {
            $er = $this->db->error();
            $data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => $er->code . ":" . $er->message);
        }

        return $data;
    }

    public function add($usuario, $clave, $id_admin) {
        $this->db->trans_start();
        $this->db->query('call invitado_add(?,?,?,@respuesta)', array($usuario, $clave, $id_admin));
        $response = $this->db->query('select @respuesta as respuesta');
        $this->db->trans_complete();
        $tmp = $response->row();

        if ($tmp) {
            switch ($tmp->respuesta) {
                case iconst_helper::OK:
                    $data = array(iconst_helper::ESTATUS => iconst_helper::OK, iconst_helper::MENSAJE => "Registro correcto");
                    break;
                case iconst_helper::EXISTE:
                    $data = array(iconst_helper::ESTATUS => iconst_helper::EXISTE, iconst_helper::MENSAJE => "El usuario ingresado ya existe");
                    break;
                default:
                    break;
            }
        } else {
            $er = $this->db->error();
            $data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => $er->code . ":" . $er->message);
        }

        return $data;
    }

    public function listar($id_admin) {
        $datos = array();
        $request = $this->db->query('call invitado_list(?)', array($id_admin));
        foreach ($request->result() as $row) {
            $datos[] = array(
                'id' => $row->id,
                'usuario' => $row->invitado_usuario,
                'primerlogin' => ($row->primer_login == "0" ? "NO" : "SI")
            );
        }
        return $datos;
    }
    
    public function cambio_clave($usuario, $clave_antigua, $clave_nueva) {
        $request = $this->db->query('call invitado_cambio_clave(?,?,?)', array($usuario, $clave_antigua, $clave_nueva));
        $tmp = $this->db->affected_rows();
        if ($tmp > 0) {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::OK, iconst_helper::MENSAJE => "Clave editada");
        } else {
            $this->data = array(iconst_helper::ESTATUS => iconst_helper::ERROR, iconst_helper::MENSAJE => "Error al editar, verifique sus datos");
        }
        return $this->data;
    }

    public function hash_clave($clave) {
        $hashed = hash('sha512', $clave);
        return $hashed;
    }

}
