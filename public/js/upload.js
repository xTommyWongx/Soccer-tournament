
// preview img before uploading
if ($('.playerPage') !== null) {

    $('#file-upload').on('change', function (e) {
        readURL(this);

    });
}

function readURL(input) {
    if (input.files && input.files[0]) {

        let reader = new FileReader();
        reader.onload = function (e) {
            $('#profilepicture').attr('src', e.target.result);
            console.log(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
// --end of preview img---//

// join tournament
if($('.join_tournament') != null){
    let form = $('.join_tournament');
    console.log('form',form);

    for(let i=0;i<form.length;i++){
        console.log('form[i]',form[i]);
       form[i].addEventListener('submit',function(e){
           e.preventDefault();
        if (form[i].querySelector('#input').value == "Join tournament"){
           const data = new URLSearchParams();
           for (const pair of new FormData(form[i])) {
              data.append(pair[0], pair[1]);
           }
           let xhr = new XMLHttpRequest();
               xhr.open('POST','api/managers/joinTournament',true);
               xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    form[i].querySelector('#input').value = "Cancel request";
                    form[i].querySelector('#input').classList.remove('btn-success');
                    form[i].querySelector('#input').classList.add('btn-danger');
                    
                }
              };
              xhr.send(data);
            
        } else{
            const data = new URLSearchParams();
           for (const pair of new FormData(form[i])) {
              data.append(pair[0], pair[1]);
           }
           let xhr = new XMLHttpRequest();
               xhr.open('POST','api/managers/cancelTournament/',true);
               xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    form[i].querySelector('#input').value = "Join tournament";
                    form[i].querySelector('#input').classList.remove('btn-danger');
                    form[i].querySelector('#input').classList.add('btn-success');
                    
                }
              };
              xhr.send(data);
            

        }
    })
    }
   
}
