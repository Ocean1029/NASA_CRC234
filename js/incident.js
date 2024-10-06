function invokeIncident() {
    mineDiscover();
    mineIncident();
    tribeProtest();
    tribeIncident();
    chargeCarbonFee();
    greenRevo();
    oilCrisis();
    carbonCreditExchange();
    airProtest();
    solarProtest();
}


function mineDiscover() {
    if(!isMineDiscovered && Math.random() <= 0.7){
        alert("Mine discovered! Would you permit license?");
        // 發放許可
        if(mineLicense == 0){  // no license
            support -= 5;
        }
        if(mineLicense == 1){  // strict license
            support += 10;
            mineIncome = 3;
            fossilFee = 0.5;
        }
        if(mineLicense == 2){  // loose license
            support += 10;
            mineIncome = 8;
            fossilFee = 0.1
        }
        isMineDiscovered = true;
    }
}

function mineIncident() {
    if(!isMineDiscovered || mineLicense == 0) return -1;
    if((mineLicense == 1 && Math.random() <= 0.03) || (mineLicense == 2 && Math.random() <= 0.3)){
        alert("Mine Incident!");
        support -= 25;
        // 發放許可
        if(mineLicense == 1 || mineLicense == 2){
            support -= 5;
        }
        if(mineLicense == 0){
            support += 5;
            mineIncome = 0;
            fossilFee = 1;
        }
    }
}


function tribeProtest() {
    if(!isTribeProtest && Math.random() <= 0.3){
        alert("tribe protest!");
        if(tribeSelect == 1){
            support -= 10;
            
        }
        if(tribeSelect == 2){
            support += 10;
            green -= greenPower;
        }
        isTribeProtest = true;
    }
}

function tribeIncident() {
    if(!isTribeProtest) return -1;
    if(tribeSelect == 1 && Math.random() <= 0.3){
        green -= greenPower;
    }
    if(tribeSelect == 2){
        green += greenPower;
        tribeSelect = 0;
    }
}


function chargeCarbonFee() {
    if(round == 4) alert("[News] To call for sustainable development goals, carbon fee will be charged in the future.");
    if(round == 6){
        alert("[Info] Start charging carbon fee.");
    }
    if(round >= 6){
        carbonFee = fossil / 100 * 1;
        finance -= carbonFee;
    }
}

function greenRevo() {
    if(round >= 5 && greenPower <= 200) greenPower *= 1.5;
}

function oilCrisis() {
    if(round >= 8 && fossilFee == 1 && Math.random() <= 0.5){
        alert("[News] Oil crisis breakout!\nFossil fuel fee increased to $2/300kw");
        fossilFee = 2;
        support -= 10;
    }
}

function carbonCreditExchange() {
    if(round >= 8 && Math.random() <= 0.5){
        alert("[News] Carbon Credit Exchange Opened!\nEvery 100kw excessive green energy could be sold for $10.");
        isCarbonCreditOpened = true;
    }
    if(isCarbonCreditOpened){
        finance += (green + fossil - 4000) * 10 >= 0 ? (green + fossil - 4000) * 10 : 0;
    }
}

function airProtest() {
    if(round <= 4 && !isairProtest && Math.random() <= 0.6){
        alert("[News] Residents protest for air pollusion!\nSupport decreases by 15.");
        support -= 15;
        isairProtest = true;
    }
}

function solarProtest() {
    if(round <= 4 && !issolarProtest && Math.random() <= 0.6){
        alert("[News] Fishing industry concerns that solar panel might occupy the land of fishing pond.\nSupport decreases by 15.");
        support -= 15;
        issolarProtest = true;
    }
}