<?php
$upload=array(
    "name" => "img",
    "size" => "25",
);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title> Upload file vs Ajax</title>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript"></script>
</head>
<body>
<div class="container">
    <div class="panel panel-success">
        <div class="panel-body">
            <form action="" method="POST" role="form">
                <legend>Upload</legend>
                <div class="form-"group>
                    <label for="name">Name</label>
                        <input id="product-name" type="text" name="product-name">
                </div>
                <div class="form-"group>
                    <label for="name">Price</label>
                        <input id="product-price" type="text" name="product-price">
                </div>
                <div class="form-"group>
                    <label for="name">Description</label>
                        <input id="product-description" type="text" name="product-description">
                </div>
                <div class="form-group">
                    <label for="file">Chọn file</label>
                    <input id="file" type="file" name="sortpic" required=""/>
                </div>
                <div class="form-group">
                    <button id="upload" class="btn btn-primary">Upload</button>
                </div>
            </form>
            <div class="status alert alert-success"></div>
        </div>
    </div>
</div>
</body>
</html>
<script>
    //xử lý khi có sự kiện click
    $('#upload').on('click', function () {
        productName = $('#product-name').val();
        productPrice = $('#product-price').val();
        productDescription = $('#product-description').val();
        console.log(productName);
        console.log(productPrice);
        //Lấy ra files
        var file_data = $('#file').prop('files')[0];
        //lấy ra kiểu file
        var type = file_data.type;
        //Xét kiểu file được upload
        var match = ["image/gif", "image/png", "image/jpg","image/jpeg"];
        //kiểm tra kiểu file
        if (type == match[0] || type == match[1] || type == match[2] || type == match[3]) {
            //khởi tạo đối tượng form data
            var form_data = new FormData();
            //thêm files vào trong form data
            form_data.append('file', file_data);
            form_data.append('name',productName);
            form_data.append('price',productPrice);
            form_data.append('description',productDescription);
            console.log(form_data);
            //sử dụng ajax post
            $.ajax({
                url: "<?php echo base_url().'auction/doUpload'?>", // gửi đến file upload.php
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (res) {
                    $('.status').text(res);
                    console.log(res);
                    $('#file').val('');
                }
            });
        } else {
            $('.status').text('Chỉ được upload file ảnh');
            $('#file').val('');
        }
        return false;
    });
</script>
