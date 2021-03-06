$(function(){
    function getAll() {
        $.ajax({
            url: 'http://localhost:3000/api/states',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#list').html('');
                data.forEach(function(state) {
                    $('#list').append('<tr><td>'+state.id+'</td><td><a href="#" data-id="'+state.id+'">'
                        +state.name+'</a></td><td>'+state.position+'</td><td>'
                        +state.population+'</td><td><button class="btn btn-danger delete" data-id="'
                        +state.id+'">Smazat</button></td></tr>');
                });
                $('#list a').on('click', function(){
                    getById($(this).data('id'));
                }); 
                $('.delete').on('click', function(){
                    deleteById($(this).data('id'));
                }); 
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function getById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/states/' + id,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#id').val(data.id);
                $('#name').val(data.name);
                $('#position').val(data.position);
                $('#population').val(data.population);
                $('#description').val(data.description);
                $('#modelId').modal('show');
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function deleteById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/states/' + id,
            type: 'DELETE',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function create(data) {
        $.ajax({
            url: 'http://localhost:3000/api/states',
            type: 'POST',
            data: data,
            dataType: 'json',            
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function update(id, data) {
        $.ajax({
            url: 'http://localhost:3000/api/states/' + id,
            type: 'PUT',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    $('button#submit').on('click', function(){
        var json = {};
        json.name = $('#name').val();
        json.position = $('#position').val();
        json.population = $('#population').val();
        json.description = $('#description').val();
        var data = JSON.stringify(json);
        if ($('#id').val()) {
            update($('#id').val(), data);
        } else {
            create(data);
        }
    });

    $('button#create').on('click', function(){
        $('#id').val('');
        $('#name').val('');
        $('#position').val('');
        $('#population').val('');
        $('#description').val('');
    });

    getAll();
});
    
