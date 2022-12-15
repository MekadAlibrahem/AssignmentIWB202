  //  مصفوفة بخزن فيها بيانات الطلاب 
  var student_list = [
    { "NO" : 1 , "Username" :  "user_id", "Bdate" : "22/12/2019", "Name" : "A"  , "Program" : "BIT" , "Mobile" : "963998019385"},   
    { "NO" : 2 , "Username" :  "user_id", "Bdate" : "22/12/2019", "Name" : "C"  , "Program" : "IT" , "Mobile" : "963998019385"},
    { "NO" : 3 ,"Username" :  "user_id", "Bdate" : "22/12/2019", "Name" : "B"  , "Program" : "TIC" , "Mobile" : "963998019385"},
];
/*  
    مصفوفة تحتوي البيانات يلي رح يتم عرضها ( مثلا اذا كنا مغيرين نوع الفرز او عرض لاختصاص واحد فقط ) 
    القيمة الابتدائية الها هي المصفوفة العادية كاملة 
*/
var temp_student_list =  student_list;
function capatcha(){
   // نص تخزين فيه قيمة الكاباتشا 
    text_capatcha ="" ;
   // مصفوفة تحتوي على الاحرف و الارقام   
    var letters = new Array('0','1','2','3', '4','5','6','7','8','9' ,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
    // متغير بخزن فيه طول الكاباتشا يلي بدي ياه
    length_capatcha = 6 ;
    //  بكرر حلقة الفور حسب طول عناصر الرمز البدي ياه
    for(i=0;i<length_capatcha;i++){
        /*
        بجيب قيمة عشوائية بين 0 و 1
        بضرب القيمة بطول مصفوفة الاحرف و الارقام (بصير معي رقم من ضمن مجال عدد عناصر المصصفوفة )
        بشيل الفواصل من الناتج  
        وبمرقه index للمصفوفة 
        => برجعلي عنصر عشوائي من المصصفوفة 
        */
        char = letters[Math.floor(Math.random() * letters.length  )];
        // اضيف المحرف لمتغير الكاباتشا 
        text_capatcha = text_capatcha + char ;
    }
    
    return text_capatcha;
}

function load_capatcha(text_capatcha){
    //  كتابة نص الكاباتشا ضمن الصصصفحة 
    document.getElementById("main_capatcha").innerHTML = text_capatcha;
}

function filter_list( list , filter_by= "ALL"){
   
    if(filter_by ==="ALL"){
        //  show all students 
        show_student_list(list);
    } else{
        //  filter تابع جاهز يعيد فقط قيم المصفوفة التي تحقق شرط معين 
        temp_student_list = list.filter(function(ele){
            return ele["Program"] == filter_by ;
        });
        show_student_list(temp_student_list);
    
    }
}

function sort_list(list , sort_by = 1){
    sort_type = {1: "NO" , 2 : "Name" , 3 : "Program"} ;
    // sort : تابع جاهز لترتيب عناصر مصفوفة وفق قيمة معينة 
    new_list = list.sort((l1 , l2) => {
        //  بقارن كل عنصرين مع بعض و برجع الاصغر
        //  بقارن حسب القيمة يلي بمرقلو ياها بالتابع 
        if(l1[sort_type[sort_by]] < l2[sort_type[sort_by]] ){
           return -1 ; 
        }else if(l1[sort_type[sort_by]] > l2[sort_type[sort_by]] ){
            return 1 ; 
        }else{
            return 0 ;
        }
     });
     console.log(new_list);
    temp_student_list = new_list ;
    return temp_student_list;
    
}

function convert_to_JSON(list){
    /*
    JSON.stringify(array , replace , space) ;
        array  : المصفوفة يلي بدي حولها
        replace : قيمة ببدلها بقيمة المصفوفة مارح بدل اي قيمة لهيك بحط null 
        space : الفراغ يلي بحطه بين عناصر المصفوفة  
            \t منشان ينزل سطر جديد 
    */
    json_list =JSON.stringify(list , null , '\t');
    document.getElementById("id_textarea_json_data").value = json_list;
}

function insert_student(input_student_name , input_user_name , input_phone ,input_birthday  ,input_program){
    new_student ={
        "NO" : student_list.length + 1 ,
        "Username" :  input_user_name,
        "Bdate" : input_birthday,
        "Name" : input_student_name ,
        "Program" : input_program ,
        "Mobile" : input_phone 
    }

    student_list.push(new_student);

}

function show_student_list(students){
    tbody_element = "";
    /** 
     *  تابع بمر ع كل عنصر بالمصفوفة 
     */
    students.forEach(item => {
        // بضيف بيانات الطالب بسطر ضمن الجدول
        tbody_element += `<tr> 
            <td> ${item["NO"]}</td>
            <td> ${item["Username"]} </td>
            <td>${item["Name"]} </td>
            <td> ${item["Program"]}</td>
        </tr>`;
    });
    // عرض البيانات على صفحة 
    document.getElementById("id_tbody_list_student").innerHTML = tbody_element ;
}

function insert(){
    // تابع لادخال طالب جديد 
    // جلب البيانات من عناصر الصفحة 
    let input_student_name  = document.getElementById('id_input_student_name').value ;
    let input_user_name = document.getElementById("id_input_user_name").value;
    let input_phone = document.getElementById("id_input_phone").value;
    let input_birthday = document.getElementById("id_input_birthday").value;
    let input_program = document.getElementById("id_select_program_name").value;
    let input_capatcha = document.getElementById("id_input_capatcha").value;
    // التحقق من صحة البيانات و مطابقتها مع الشروط المطلوبة 
    isValiad_data =  validate(input_student_name , input_user_name , input_phone ,input_birthday  ,input_capatcha);
    if(isValiad_data === true){
        // البيانات صحية 
        // إدخال بيانات طالب جديد 
        insert_student(input_student_name , input_user_name , input_phone ,input_birthday  ,input_program);
        // عرض البيانات الجديدة على الصفحة 
        show_student_list(temp_student_list);
    }
}

function validate(input_student_name , input_user_name , input_phone ,input_birthday   ,input_capatcha){
    
    isValid_student_name  = valid_student_name(input_student_name);
    isValid_user_name = valid_user_name(input_user_name);
    isValid_phone = valid_phone(input_phone);
    isValid_birthday = valid_birthday(input_birthday);
    isValid_capatcha = valid_capatcha(input_capatcha);
    if( isValid_phone === true && isValid_student_name === true && isValid_user_name === true && isValid_birthday === true && isValid_capatcha === true){
        return true;
    }else{
        return false
    }

        
    
}

function valid_student_name(input_student_name){
    if(!input_student_name){
        document.getElementById('id_error_student_name').innerHTML = "هذا الحقل مطلوب  ";
        return false;
    }
    /*
    unicode Arabic Range: 0600–06FF [
        0620 -064A  مجال الاحرف العربية بدون رموز و الفواصل  و الارقام
    ]
    منترك فراغ قبل اغلاق القوس منشان ياخد الفراغات 
    */
    let isArabic = /^[\u0620-\u064A]{1}[\u0620-\u064A ]+$/;
    if (input_student_name.match(isArabic)){
        // إذا كان الادخال صحيح إزالة اي رسالة خطأ سابقة  
        document.getElementById('id_error_student_name').innerHTML = "";
        return true ;

    }else{
        //  إذا كان الإدخال خاطئ عرض رسالة خطأ 
        document.getElementById('id_error_student_name').innerHTML = "يجب ان يتم إدخال الاسم باللغة العربية ";
        return false;
    }
}

function valid_user_name(input_user_name){
    if(!input_user_name){
        document.getElementById('id_error_user_name').innerHTML = "هذا الحقل مطلوب  ";
        return false;
    }
   
   let regx_user_name = /[A-Z]{1}[a-z]+_\d+/;
   if (input_user_name.match(regx_user_name)){
       // إذا كان الادخال صحيح إزالة اي رسالة خطأ سابقة  
       document.getElementById('id_error_user_name').innerHTML = "";
       return true ;

   }else{
       //  إذا كان الإدخال خاطئ عرض رسالة خطأ 
       document.getElementById('id_error_user_name').innerHTML ="اسم المستخدم غير صالح يجب ان يكون مثل  (User_2321) ";;
       return false;
   }
}

function valid_phone(input_phone){
    if(!input_phone){
        document.getElementById('id_error_phone').innerHTML = "هذا الحقل مطلوب  ";
        return false;
    }
   
   let regx_phone_syria= /\+963-\d{9}/;
   let regx_phone= /\+\d+-\d{7}/;
   if (input_phone.match(regx_phone_syria) || input_phone.match(regx_phone) ){
       // إذا كان الادخال صحيح إزالة اي رسالة خطأ سابقة  
       document.getElementById('id_error_phone').innerHTML = "";
       return true ;

   }else{
       //  إذا كان الإدخال خاطئ عرض رسالة خطأ 
       document.getElementById('id_error_phone').innerHTML ="اسم المستخدم غير صالح يجب ان يكون مثل  (+963-123456789 او +54-1234567) ";;
       return false;
   }
}

function valid_birthday(input_birthday){
    if(!input_birthday){
        document.getElementById('id_error_birthday').innerHTML = "هذا الحقل مطلوب  ";
        return false;
    }else{
        document.getElementById('id_error_birthday').innerHTML = "";

        return true ;
    }
   
}

function valid_capatcha(input_capatcha ){
    if(!input_capatcha){
        document.getElementById('id_error_capatcha').innerHTML = "هذا الحقل مطلوب  ";
        return false;
    }
   
   if (main_capatcha == input_capatcha){
       // إذا كان الادخال صحيح إزالة اي رسالة خطأ سابقة  
       document.getElementById('id_error_capatcha').innerHTML = "";
       return true ;

   }else{
       //  إذا كان الإدخال خاطئ عرض رسالة خطأ 
       document.getElementById('id_error_capatcha').innerHTML ="إن القيمة المدخلة خاطئة";;
       return false;
   }
}

var main_capatcha = capatcha();
show_student_list(sort_list(temp_student_list));