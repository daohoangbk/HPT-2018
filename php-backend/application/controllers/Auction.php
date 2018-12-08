<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class Auction extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('auction_model');
        $this->load->helper(array("form", "url"));
    }

    public function index()
    {
        $data['errors'] = '';
        $this->load->view('send-file', $data);
    }

    public function ctrl2()
    {
        echo 'ctrl2';
    }

    public function doUpload()
    {
        $config['upload_path'] = 'assets/';
        $config['allowed_types'] = 'gif|jpg|png';
        $new_name = time() . $_FILES["file"]['name'];
        $config['file_name'] = $new_name;
        $this->load->library("upload");
        $this->upload->initialize($config);
        if ($this->upload->do_upload("file")) {
            $check = $this->upload->data();
            $data['image'] = 'localhost/hpt/' . $config['upload_path'] . $_FILES['file']['name'];
            $data['name'] = $this->input->post('name');
            $data['price'] = $this->input->post('price');
            $data['description'] = $this->input->post('description');
            $result = $this->auction_model->upload_file($data);
            if ($result) {
                echo json_encode(array(
                    "status" => '000'
                ));
                die();
            }
        }
        echo json_encode(array(
            "status" => '001'
        ));
        die();
    }

    public function get_lastest_record()
    {
        $item = $this->auction_model->get_lastest_record();
        if ($item) {
            echo json_encode(array(
                "status" => '000',
                "data" => $item
            ));
            die();
        } else json_encode(array(
            "status" => '001'
        ));
        die();
    }
}