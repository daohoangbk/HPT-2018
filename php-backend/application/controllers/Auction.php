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
        if (1) {
            $config['upload_path'] = 'assets/';
            $config['allowed_types'] = 'gif|jpg|png';
//            $config['max_size'] = '900';
//            $config['max_width'] = '1024';
//            $config['max_height'] = '768';
            $this->load->library("upload");
            $this->upload->initialize($config);

            if ($this->upload->do_upload("file")) {
                $check = $this->upload->data();
                $data['image'] = $config['upload_path'].$_FILES['file']['name'];
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
//        if (isset($_POST) && !empty($_FILES['file'])) {
//            $duoi = explode('.', $_FILES['file']['name']); // tách chuỗi khi gặp dấu .
//            $duoi = $duoi[(count($duoi) - 1)]; //lấy ra đuôi file
//            // Kiểm tra xem có phải file ảnh không
//            if ($duoi === 'jpg' || $duoi === 'png' || $duoi === 'gif') {
//                // tiến hành upload
//                if (move_uploaded_file($_FILES['file']['tmp_name'], 'assets/' . $_FILES['file']['name'])) {
//                    // Nếu thành công
//                    die('Upload thành công file: ' . $_FILES['file']['name']); //in ra thông báo + tên file
//                } else { // nếu không thành công
//                    die('Có lỗi!'); // in ra thông báo
//                }
//            } else { // nếu không phải file ảnh
//                die('Chỉ được upload ảnh'); // in ra thông báo
//            }
//        } else {
//            die('Lock'); // nếu không phải post method
//        }
    }
    public function get_lastest_record(){
        $item = $this->auction_model->get_lastest_record();
       if($item){
           echo json_encode(array(
               "status" => '000',
               "data" => $item
           ));
           die();
       }else json_encode(array(
           "status" => '001'
       ));
        die();
    }
}