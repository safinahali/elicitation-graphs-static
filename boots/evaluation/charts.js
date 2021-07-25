var dataset = [{"threshold":0,"tn":39,"fp":26,"fn":5,"tp":30},{"threshold":1,"tn":32,"fp":33,"fn":19,"tp":16},{"threshold":2,"tn":45,"fp":20,"fn":18,"tp":17},{"threshold":3,"tn":28,"fp":37,"fn":19,"tp":16},{"threshold":4,"tn":34,"fp":31,"fn":18,"tp":17},{"threshold":5,"tn":38,"fp":27,"fn":17,"tp":18},{"threshold":6,"tn":25,"fp":40,"fn":16,"tp":19},{"threshold":7,"tn":27,"fp":38,"fn":4,"tp":31},{"threshold":8,"tn":38,"fp":27,"fn":20,"tp":15},{"threshold":9,"tn":32,"fp":33,"fn":17,"tp":18},{"threshold":10,"tn":20,"fp":45,"fn":21,"tp":14},{"threshold":11,"tn":32,"fp":33,"fn":19,"tp":16},{"threshold":12,"tn":26,"fp":39,"fn":16,"tp":19},{"threshold":13,"tn":43,"fp":22,"fn":11,"tp":24},{"threshold":14,"tn":25,"fp":40,"fn":16,"tp":19},{"threshold":15,"tn":29,"fp":36,"fn":12,"tp":23},{"threshold":16,"tn":41,"fp":24,"fn":9,"tp":26},{"threshold":17,"tn":33,"fp":32,"fn":17,"tp":18},{"threshold":18,"tn":24,"fp":41,"fn":19,"tp":16},{"threshold":19,"tn":39,"fp":26,"fn":18,"tp":17},{"threshold":20,"tn":24,"fp":41,"fn":5,"tp":30},{"threshold":21,"tn":21,"fp":44,"fn":14,"tp":21},{"threshold":22,"tn":32,"fp":33,"fn":18,"tp":17},{"threshold":23,"tn":31,"fp":34,"fn":20,"tp":15},{"threshold":24,"tn":38,"fp":27,"fn":21,"tp":14},{"threshold":25,"tn":38,"fp":27,"fn":9,"tp":26},{"threshold":26,"tn":35,"fp":30,"fn":22,"tp":13},{"threshold":27,"tn":32,"fp":33,"fn":12,"tp":23},{"threshold":28,"tn":33,"fp":32,"fn":4,"tp":31},{"threshold":29,"tn":23,"fp":42,"fn":7,"tp":28}]

var thresholdA = 0;
var thresholdB = 15;
var myChart1;
var myChart2;
var myChart3;
var myChart4;
var tnA, tpA, fnA, fpA, tnB, tpB, fpB, fnA;
var button1Count = 0;
var button2Count = 0;
var loadCount = 0;
var buttonChoices = [];
var epochs = [];
var startTime = 0;

var firebaseConfig = {
apiKey: "AIzaSyDSBbFAqBoxyeauD8Floci3BrD0UkvOhgg",
authDomain: "metric-elicitation.firebaseapp.com",
databaseURL: "https://metric-elicitation-default-rtdb.firebaseio.com",
projectId: "metric-elicitation",
storageBucket: "metric-elicitation.appspot.com",
messagingSenderId: "828132856142",
appId: "1:828132856142:web:1a7f9b6680ed64d1348e1f",
measurementId: "G-ZSLY684MQG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
database = firebase.database();

function logdata(){
    var uid = localStorage.getItem("uid");

    var ref = database.ref(uid);
    ref.push({
        UID: uid,
        thresholdA: thresholdA,
        thresholdB: thresholdB,
        startTime: startTime,
        evalchoices: buttonChoices,
        evaltimes: epochs
    });

    window.setTimeout(function(){

// Move to a new location or you can do something else
        window.location.href = "thanks.html";

}, 1000);

    // window.location.href = 'prelim.html';
}

function setThresholds(clicked_id){

    button1Count++;

    thresholdA = thresholdA + 1;
    thresholdB = thresholdB + 1;

    buttonChoices.push(clicked_id);
    console.log(clicked_id);
    
    var currentTime = new Date();
    epochs.push(currentTime);

    if(thresholdA > 14){
//         SAFINAH -- When this condition is met, we move to the thank you page
    	logdata();
    }

    document.getElementById('myChart1').remove();
    document.getElementById('myChart2').remove();
    document.getElementById('myChart3').remove();
    document.getElementById('myChart4').remove();

    //recreating graphs
    drawCharts();
    
    document.getElementById('tpA').textContent = tpA;
    document.getElementById('fpA').textContent = fpA;
    document.getElementById('fnA').textContent = fnA;
    document.getElementById('tnA').textContent = tnA;

    //GAURUSH: write your high number logic here
    document.getElementById('predHighA').textContent = "high risk (" + pred_p_A + ")" ;
    document.getElementById('predLowA').textContent = "low risk (" + pred_n_A + ")" ;

    document.getElementById('tpB').textContent = tpB;
    document.getElementById('fpB').textContent = fpB;
    document.getElementById('fnB').textContent = fnB;
    document.getElementById('tnB').textContent = tnB;

    document.getElementById('predHighB').textContent = "high risk (" + pred_p_B + ")" ;
    document.getElementById('predLowB').textContent = "low risk (" + pred_n_B + ")" ;
}

function setThresholdsA(){

	//GAURUSH: any logic here needs to be replicated below. 

    button1Count++;
    //GAURUSH: change thresholds here. THIS IS NOT THE CORRECT LOGIC.
    thresholdB = thresholdB+1;

    //GAURUSH: add condition here for a-b < 0.05. this needs to be modulus
    if(thresholdB > 29){
    	logdata();
    }

    //GAURUSH: write an if statement here for your variables
    //deleting old graphs
    document.getElementById('myChart1').remove();
    document.getElementById('myChart2').remove();
    document.getElementById('myChart3').remove();
    document.getElementById('myChart4').remove();

    //recreating graphs
    drawCharts();

    document.getElementById('tpB').textContent = tpB;
    document.getElementById('fpB').textContent = fpB;
    document.getElementById('fnB').textContent = fnB;
    document.getElementById('tnB').textContent = tnB;

    document.getElementById('predHighB').textContent = "high risk (" + pred_p_B + ")" ;
    document.getElementById('predLowB').textContent = "low risk (" + pred_n_B + ")" ;
}

function setThresholdsB(){
    button2Count++;
    //GAURUSH: change thresholds here
    thresholdA = thresholdA+1;

    if(thresholdA > 14){
    	logdata();
    }

    document.getElementById('myChart1').remove();
    document.getElementById('myChart2').remove();
    document.getElementById('myChart3').remove();
    document.getElementById('myChart4').remove();

    drawCharts();

    document.getElementById('tpA').textContent = tpA;
    document.getElementById('fpA').textContent = fpA;
    document.getElementById('fnA').textContent = fnA;
    document.getElementById('tnA').textContent = tnA;

    //GAURUSH: write your high number logic here
    document.getElementById('predHighA').textContent = "high risk (" + pred_p_A + ")" ;
    document.getElementById('predLowA').textContent = "low risk (" + pred_n_A + ")" ;
}


function drawCharts(){

    if(loadCount<1){
        startTime = new Date();
        loadCount++;
    }

    if (button1Count>0 || button2Count>0){
      var myChart1 = document.createElement('canvas');
      myChart1.setAttribute("id", "myChart1");
      myChart1.setAttribute("width", "600");
      myChart1.setAttribute("height", "200");
      const chartcol1 = document.getElementById("chartcol1");
      chartcol1.appendChild(myChart1);

      var myChart2 = document.createElement('canvas');
      myChart2.setAttribute("id", "myChart2");

      myChart2.setAttribute("width", "600");
      myChart2.setAttribute("height", "200");
      chartcol1.appendChild(myChart2);

      var myChart3 = document.createElement('canvas');
      myChart3.setAttribute("id", "myChart3");

      myChart3.setAttribute("width", "600");
      myChart3.setAttribute("height", "200");
      const chartcol2 = document.getElementById("chartcol2");
      chartcol2.appendChild(myChart3);

      var myChart4 = document.createElement('canvas');
      myChart4.setAttribute("id", "myChart4");
      myChart4.setAttribute("width", "600");
      myChart4.setAttribute("height", "200");
      chartcol2.appendChild(myChart4);
    }

    for (element in dataset){
        if(dataset[element].threshold.toFixed(4) == thresholdA){
            tnA = dataset[element].tn;
            tpA = dataset[element].tp;
            fnA = dataset[element].fn;
            fpA = dataset[element].fp;
            total_n_A = tnA + fpA;
            total_p_A = fnA + tpA;
            pred_n_A = tnA + fnA;
            pred_p_A = fpA + tpA;
        }

        if(dataset[element].threshold.toFixed(4) == thresholdB){
            tnB = dataset[element].tn;
            tpB = dataset[element].tp;
            fnB = dataset[element].fn;
            fpB = dataset[element].fp;
            total_n_B = tnB + fpB;
            total_p_B = fnB + tpB;
            pred_n_B = tnB + fnB;
            pred_p_B = fpB + tpB;
        }
    }

    console.log("values are" + fpA, tnA, fpB, tnB, fnA, tpA);

    var ctx1 = document.getElementById('myChart1').getContext('2d');
    myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
//             labels: ['False Positive', 'True Negative'],
            labels: ['', ''],
            datasets: [{
                label: '',
//                 data: [fpA*100, tnA*100],
                data: [fpA, tnA],
                backgroundColor: [
                    'rgba(255, 113, 47, 0.5)',
                    'rgba(54, 114, 241)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      text: 'Did not have cancer (' + String(total_n_A) + ')',
                      display: true
                    }
                }
            }
        }
    });

    var ctx2 = document.getElementById('myChart2').getContext('2d');
    myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['', ''],
            labels: ['Labelled high risk (' + String(pred_p_A) + ')', 'Labelled low risk (' + String(pred_n_A) + ')'],
            datasets: [{
                label: '',
//                 data: [tpA*100, fnA*100],
                data: [tpA, fnA],
                backgroundColor: [
                    'rgba(255, 113, 47)',
                    'rgba(54, 114, 241, 0.5)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      text: 'Actually had cancer (' + String(total_p_A) + ')',
                      display: true
                    }
                }
            }
        }
    });

    var ctx3 = document.getElementById('myChart3').getContext('2d');
    myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['', ''],
            datasets: [{
                label: '',
//                 data: [fpB*100, tnB*100],
                data: [fpB, tnB],
                backgroundColor: [
                    'rgba(255, 113, 47, 0.5)',
                    'rgba(54, 114, 241)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      text: 'Did not have cancer (' + String(total_n_B) + ')',
                      display: true
                    }
                }
            }
        }
    });

    var ctx4 = document.getElementById('myChart4').getContext('2d');
    myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
//             labels: ['True Positive', 'False Negative'],
            labels: ['Labelled high risk (' + String(pred_p_B) + ')', 'Labelled low risk (' + String(pred_n_B) + ')'],
            datasets: [{
                label: '',
//                 data: [tpB*100, fnB*100],
                data: [tpB, fnB],
                backgroundColor: [
                    'rgba(255, 113, 47)',
                    'rgba(54, 114, 241, 0.5)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      text: 'Actually had cancer (' + String(total_p_B) + ')',
                      display: true
                    }
                }
            }
        }
    });


    }

