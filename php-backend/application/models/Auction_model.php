<?php

class Auction_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    function upload_file($data)
    {
        $this->db->insert('product', $data);
        if ($this->db->affected_rows() > 0) {
            return true;
        } else return false;
    }
    function get_lastest_record(){
        $this->db->select('*');
        $this->db->from('product');
        $this->db->order_by('id','dsc');
        $query = $this->db->get();
        if($query->num_rows() > 0){
            $result = $query->result_array();
            return $result[0];
        }else return false;
    }
}