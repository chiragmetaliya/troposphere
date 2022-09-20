// const data = JSON.parse(data);
const ALL_COURSES = "ALL_COURSES"
const ALL_LEVEL = "ALL_LEVEL"
const DEFAULT_COURSES = ["Medical", "Dental", "Ayurveda"]
const DEFAULT_LEVELS = ["UG", "PG", "DIPLOMA", "Ph.D"]
let selFeeType = "";
let selNationality = "";
let selCourse = "";
let selLevel = "";

$(document).ready(function () {
    document.getElementById('lblNationality').style.visibility = "hidden";
    document.getElementById('nationalities').style.visibility = "hidden";
    document.getElementById('lblCourse').style.visibility = "hidden";
    document.getElementById('courses').style.visibility = "hidden";
    document.getElementById('lblLevel').style.visibility = "hidden";
    document.getElementById('levels').style.visibility = "hidden";
    document.getElementById('lblFee').style.visibility = "hidden";
    $.ajax({
        url: 'fillFeeTypes',
        type: 'get',
        success: function (response) {
            const feeType = Object.keys(response);
            let ddlFeeType = document.getElementById("feeTypes");
            feeType.forEach(fee => {
                let opt = document.createElement("option");
                opt.text = opt.value = fee;
                ddlFeeType.add(opt);
            });
        }
    });
});

const fillNationality = (option) => {
    document.getElementById("nationalities").innerHTML = "";
    document.getElementById('lblNationality').style.visibility = "hidden";
    document.getElementById('nationalities').style.visibility = "hidden";
    document.getElementById('lblCourse').style.visibility = "hidden";
    document.getElementById('courses').style.visibility = "hidden";
    document.getElementById('lblLevel').style.visibility = "hidden";
    document.getElementById('levels').style.visibility = "hidden";
    document.getElementById('lblFee').style.visibility = "hidden";
    selFeeType = option.value;
    $.ajax({
        url: `fillNationality?feetype=${selFeeType}`,
        type: 'get',
        success: function (nationalities) {
            console.log(nationalities);
            let ddlNationality = document.getElementById("nationalities");
            nationalities.forEach(nationality => {
                let opt = document.createElement("option");
                opt.text = opt.value = nationality;
                ddlNationality.add(opt);
                document.getElementById('lblNationality').style.visibility = "visible";
                document.getElementById('nationalities').style.visibility = "visible";
            });
        }
    });

}

const fillCourses = (option) => {
    document.getElementById("courses").innerHTML = "";
    document.getElementById('lblCourse').style.visibility = "hidden";
    document.getElementById('courses').style.visibility = "hidden";
    document.getElementById('lblLevel').style.visibility = "hidden";
    document.getElementById('levels').style.visibility = "hidden";
    document.getElementById('lblFee').style.visibility = "hidden";
    selNationality = option.value;
    $.ajax({
        url: `fillCourses?nationality=${selNationality}`,
        type: 'get',
        success: function (courses) {
            let ddlCourses = document.getElementById("courses");
            courses.forEach(course => {
                let opt = document.createElement("option");
                opt.text = opt.value = course;
                ddlCourses.add(opt);
                document.getElementById('lblCourse').style.visibility = "visible";
                document.getElementById('courses').style.visibility = "visible";
            });
        }
    });
}

const fillLevels = (option) => {
    document.getElementById("levels").innerHTML = "";
    document.getElementById('lblLevel').style.visibility = "hidden";
    document.getElementById('levels').style.visibility = "hidden";
    document.getElementById('lblFee').style.visibility = "hidden";
    selCourse = option.value
    $.ajax({
        url: `fillLevels?course=${selCourse}`,
        type: 'get',
        success: function (levels) {
            let ddlLevels = document.getElementById("levels");
            levels.forEach(level => {
                let opt = document.createElement("option");
                opt.text = opt.value = level;
                ddlLevels.add(opt);
                document.getElementById('lblLevel').style.visibility = "visible";
                document.getElementById('levels').style.visibility = "visible";
            });
        }
    });
}

const finalFees = (option) => {
    document.getElementById('lblFee').style.visibility = "hidden";
    selLevel = option.value;
    $.ajax({
        url: `finalFees?level=${selLevel}`,
        type: 'get',
        success: function (fee) {
            document.getElementById("lblFee").innerHTML = fee;
            document.getElementById('lblFee').style.visibility = "visible";
        }
    });
}