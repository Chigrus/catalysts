<script>
    export let calcCeramics;

    let errors = {
        erProducer: false,
        erProducerWeight: false,
        erContentsPD: false,
        erContentsPT: false,
        erContentsRH: false,
    };

    let isShowSuccess = false;

    function closePopup() {
        clearCalc();
		calcCeramics.isShow = false;
	}

    function closeCalc() {
        isShowSuccess = false;
		clearCalc();
        closePopup();
	}

    function newCalc() {
        isShowSuccess = false;
		clearCalc();
	}

    function onProducer() {
		errors.erProducer = false;
	}

    function onProducerWeight() {
		errors.erProducerWeight = false;
	}

    // function onContentsPD() {
	// 	errors.erContentsPD = false;
	// }

    // function onContentsPT() {
	// 	errors.erContentsPT = false;
	// }

    // function onContentsRH() {
	// 	errors.erContentsRH = false;
	// }

    function sendData() {
        //console.log(calcCeramics);
        if (calcCeramics.producer === ''){
            errors.erProducer = true;
        }
        if (calcCeramics.producerWeight === 0){
            errors.erProducerWeight = true;
        }
        // if (calcCeramics.contentsPD === 0){
        //     errors.erContentsPD = true;
        // }
        // if (calcCeramics.contentsPT === 0){
        //     errors.erContentsPT = true;
        // }
        // if (calcCeramics.contentsRH === 0){
        //     errors.erContentsRH = true;
        // }
        
        let countErrors = 0;

        for(var index in errors) { 
            if (errors[index]){
                countErrors++;
            }
        }

        if (countErrors === 0){
            fetch('/sendmessage', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: calcCeramics
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if(data.status){
                        isShowSuccess = true;
                    }
            });
        }
	}

    function clearCalc() {
        calcCeramics.producer = '';
        calcCeramics.producerWeight = 0;
        calcCeramics.contentsPD = 0;
        calcCeramics.contentsPT = 0;
        calcCeramics.contentsRH = 0;

        errors.erProducer = false;
        errors.erProducerWeight = false;
        errors.erContentsPD = false;
        errors.erContentsPT = false;
        errors.erContentsRH = false;        
	}

    $: calcCeramics.dryWeight = (calcCeramics.producerWeight - (calcCeramics.humidity*calcCeramics.producerWeight/100)).toFixed(2);

    $: calcCeramics.contentsPDgr = (1000*calcCeramics.dryWeight*calcCeramics.contentsPD/100).toFixed(2);
    $: calcCeramics.contentsPTgr = (1000*calcCeramics.dryWeight*calcCeramics.contentsPT/100).toFixed(2);
    $: calcCeramics.contentsRHgr = (1000*calcCeramics.dryWeight*calcCeramics.contentsRH/100).toFixed(2);
    
    $: calcCeramics.totalOneKG = (0.64*((1000*0.77*calcCeramics.contentsPD/100).toFixed(2)*calcCeramics.qotes[0].value + (1000*0.77*calcCeramics.contentsPT/100).toFixed(2)*calcCeramics.qotes[1].value + (1000*0.77*calcCeramics.contentsRH/100).toFixed(2)*calcCeramics.qotes[2].value)).toFixed(2);
    
    $: calcCeramics.totalPrice = (0.64*(calcCeramics.contentsPDgr*calcCeramics.qotes[0].value*0.77 + calcCeramics.contentsPTgr*calcCeramics.qotes[1].value*0.77 + calcCeramics.contentsRHgr*calcCeramics.qotes[2].value*0.77)).toFixed(2);
    
</script>

<div class="glass" class:open={calcCeramics.isShow}>
    <div class="popup">
        {#if isShowSuccess}
        <div class="success">
            <div class="message">
                <div class="messageTitle">Ваш расчет успешно отправлен на почту</div>
                <div class="messageLine">
                    <div class="btnNext" on:click="{newCalc}">Новый расчет</div>
                    <div class="btnStop" on:click="{closeCalc}">Закрыть</div>
                </div>
            </div>
        </div>
        {/if}
        <span class="close" on:click={closePopup}></span>
        <div class="title">{calcCeramics.title}  - Расчет</div>
        <div class="content">
            <div class="line">
                <div class="label">ПОСТАВЩИК</div>
                <div class="inputBlock both">
                    <div class="info left">@</div>
                    <div class="info right"></div>
                    <input class="{errors.erProducer ? 'input error' : 'input'}" type="text" placeholder="Ф.И.О" on:focus="{onProducer}" bind:value={calcCeramics.producer}  />
                </div>
            </div>
            <div class="line">
                <div class="label">МАССА<br> ПОСТАВЩИКА</div>
                <div class="inputBlock right">
                    <div class="info right">КГ</div>
                    <input class="{errors.erProducerWeight ? 'input right value error' : 'input right value'}" type="number" step="0.01" min="0" on:focus="{onProducerWeight}" bind:value={calcCeramics.producerWeight} />
                </div>
            </div>
            <div class="lines">
                <div class="line">
                    <div class="label">Влажность</div>
                    <div class="inputBlock left">
                        <div class="info left green">%</div>
                        <input class="input value" type="number" step="0.01" min="0" bind:value={calcCeramics.humidity}  />
                    </div>
                </div>
                <div class="line">
                    <div class="label right">Сухая<br> масса</div>
                    <div class="inputBlock right">
                        <div class="info right">КГ</div>
                        <input class="input right value" type="number" step="0.01" min="0" readonly bind:value={calcCeramics.dryWeight} />
                    </div>
                </div>
            </div>
            <div class="separator"></div>
            <div class="line top">
                <div class="label">LME - ОСНОВНЫЕ ПОКАЗАТЕЛИ НА ДАТУ ФИКСАЦИИ</div>
                <div class="inputBlocks qotes">
                    <div class="inputBlock both">
                        <div class="info left">PD</div>
                        <div class="info right">₽/гр</div>
                        <input class="input right value" type="text" readonly value="{calcCeramics.qotes[0].value}" />
                    </div>
                    <div class="inputBlock both">
                        <div class="info left">PT</div>
                        <div class="info right">₽/гр</div>
                        <input class="input right value" type="text" readonly value="{calcCeramics.qotes[1].value}" />
                    </div>
                    <div class="inputBlock both">
                        <div class="info left">RH</div>
                        <div class="info right">₽/гр</div>
                        <input class="input right value" type="text" readonly value="{(calcCeramics.qotes[2].value-(calcCeramics.qotes[2].value*2/100)).toFixed(2)}" />
                    </div>
                </div>
            </div>
            <div class="separator"></div>
            <div class="line top">
                <div class="label">СОДЕРЖАНИЕ ПО РЕЗУЛЬТАТАМ СПЕКТРАЛЬНОГО АНАЛИЗА</div>
                <div class="inputBlocks twolines">
                    <div class="lines contents">
                        <div class="line">
                            <div class="inputBlock both">
                                <div class="info left">PD</div>
                                <div class="info right">%</div>
                                <input class="{errors.erContentsPD ? 'input right value error' : 'input right value'}" type="number" step="0.001" min="0" bind:value={calcCeramics.contentsPD}  />
                            </div>
                        </div>
                        <div class="line">
                            <div class="inputBlock right">
                                <div class="info right">ГР</div>
                                <input class="input right value" type="number" step="0.01" min="0" readonly bind:value={calcCeramics.contentsPDgr} />
                            </div>
                        </div>
                    </div>
                    <div class="lines">
                        <div class="line">
                            <div class="inputBlock both">
                                <div class="info left">PT</div>
                                <div class="info right">%</div>
                                <input class="{errors.erContentsPT ? 'input right value error' : 'input right value'}" type="number" step="0.001" min="0" bind:value={calcCeramics.contentsPT}  />
                            </div>
                        </div>
                        <div class="line">
                            <div class="inputBlock right">
                                <div class="info right">ГР</div>
                                <input class="input right value" type="number" step="0.01" min="0" readonly bind:value={calcCeramics.contentsPTgr} />
                            </div>
                        </div>
                    </div>
                    <div class="lines">
                        <div class="line">
                            <div class="inputBlock both">
                                <div class="info left">RH</div>
                                <div class="info right">%</div>
                                <input class="{errors.erContentsRH ? 'input right value error' : 'input right value'}" type="number" step="0.001" min="0" bind:value={calcCeramics.contentsRH}  />
                            </div>
                        </div>
                        <div class="line">
                            <div class="inputBlock right">
                                <div class="info right">ГР</div>
                                <input class="input right value" type="number" step="0.01" min="0" readonly bind:value={calcCeramics.contentsRHgr} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator"></div>
            <!-- <div class="line">
                <div class="label">ИТОГО ЗА КГ</div>
                <div class="inputBlock right">
                    <div class="info right purple">₽</div>
                    <input class="input right value" type="number" step="0.01" min="0" readonly bind:value={calcCeramics.totalOneKG} />
                </div>
            </div> -->
            <div class="line">
                <div class="label">ОБЩАЯ<br> СТОИМОСТЬ</div>
                <div class="inputBlock right">
                    <div class="info right purple">₽</div>
                    <input class="input right value" type="number" step="0.01" min="0" readonly bind:value={calcCeramics.totalPrice} />
                </div>
            </div>
            <div class="separator"></div>
            <div class="line">
                <div class="label">МЕНЕДЖЕР</div>
                <div class="inputBlock manager">
                    <div class="order" on:click="{sendData}">ОТПРАВИТЬ</div>
                    <input class="input" type="text" bind:value={calcCeramics.manager}  />
                </div>
                <div class="clear" on:click="{clearCalc}">C</div>
            </div>
        </div>
    </div>
</div>

<style>
.glass{
    position: fixed;
    z-index: 110;
    top: 0;
    left: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-image: url(/img/bg-calc.jpg);
    background-repeat: repeat;
}

.glass.open{
    display: flex;
}

.popup{
    position: relative;
    width: calc(100% - 40px);
    max-width: 1000px;
    max-height: calc(100vh - 60px);
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 3px;
}

.success{
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.9);
}

.message{
    width: calc(100% - 20px);
    max-width: 420px;
    box-sizing: border-box;
    padding: 40px 20px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 3px;
}


.messageTitle{
    width: 100%;
    font-size: 18px;
    text-align: center;
    color: #31c96f;
}

.messageLine{
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btnNext{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    border: 1px solid rgba(0,0,0,0.3);
    cursor: pointer;
    border-radius: 5px;
    background-color: #515253;
    color: #ffca00;
}

.btnStop{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.3);
    margin-left: 20px;
    border-radius: 5px;
    background-color: #515253;
    color: #ffca00;
}

.close{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    background-image: url(/svg/close.svg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 20px 20px;
    cursor: pointer;
}

.title{
    display: flex;
    align-items: center;
    height: 80px;
    font-size: 28px;
    font-family: MyriadPro-Bold;
    color: #464a53;
    font-style: italic;
    box-sizing: border-box;
    padding: 0px 40px 0 40px;
}

.content{
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px 40px 40px;
    overflow-y: auto;
    max-height: calc(100vh - 140px);
}

.lines{
    display: flex;
}

.line{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 15px;
}

.line.top{
    align-items: flex-start;
}

.separator{
    width: 100%;
    height: 1px;
    background-color: #dddfe1;
    margin: 20px 0;
}

.label{
    width: 200px;
    min-width: 200px;
    font-size: 20px;
    color: #464a53;
    text-transform: uppercase;
    box-sizing: border-box;
    padding-right: 50px;
}

.label.right{
    text-align: right;
}

.inputBlocks{
    width: calc(100% - 200px); 
}

.inputBlock{
    position: relative;
    width: calc(100% - 200px);
    height: 70px;
    box-sizing: border-box;
}

.inputBlocks .inputBlock{
    width: 100%;
    margin-bottom: 20px;
}

.inputBlocks .inputBlock:last-child{
    margin-bottom: 0;
}

.info{
    position: absolute;
    top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: calc(100% - 2px);
    background-color: #f0f0f2;
    font-size: 20px;
    box-sizing: border-box;
    color: #abafb3;
    text-transform: uppercase;
}

.info.green{
    background-color: #31c96f;
    color: #fff;
}

.info.purple{
    background-color: #7f63f4;
    color: #fff;
}

.info.right{
    right: 1px;
    border-left: 1px solid #dddfe1;
}

.info.left{
    left: 1px;
    border-right: 1px solid #dddfe1;
}

.input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #dddfe1;
    font-size: 20px;
    padding: 0 20px;
    outline: none;
}

.input.error{
    border: 1px solid red;
}

.input:focus{
    border: 1px solid rgba(0,0,0,0.3);
}

.inputBlock.right .input{
    padding-right: 85px;
}

.inputBlock.left .input{
    padding-left: 85px;
}

.inputBlock.both .input{
    padding: 0 85px;
}

.inputBlock.manager .input{
    padding-right: 164px;
}

.input.right{
    text-align: right;
}

.input.value{
    font-size: 40px;
}

.lines.contents .line{
    margin-top: 0;
}

.inputBlocks.twolines .lines .line:nth-child(2){
    margin-left: 40px;
}

.order{
    position: absolute;
    top: 1px;
    right: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 144px;
    height: calc(100% - 2px);
    background-color: #31c96f;
    font-size: 20px;
    box-sizing: border-box;
    color: #fff;
    text-transform: uppercase;
    border-left: 1px solid #dddfe1;
    cursor: pointer;
}

.clear{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    margin-left: 10px;
    font-size: 24px;
    font-family: MyriadPro-Bold;
    color: #fff;
    cursor: pointer;
    background-color: red;
}

@media only screen and (max-width: 5000px){

    .popup{
        max-height: calc(100vh - 40px);
    }

    .close{
        top: 15px;
    }

    .title{
        font-size: 20px;
        height: 40px;
        padding: 10px 20px 0 20px;
    }

    .content{
        padding: 0 20px 20px 20px;
        max-height: calc(100vh - 80px);
    }
    .line{
        flex-wrap: wrap;
        margin-top: 10px;
    }

    .label{
        width: 100%;
        font-size: 14px;
    }

    .label br{
        display: none;
    }

    .inputBlock{
        width: 100%;
        height: 40px;
    }

    .inputBlocks{
        width: 100%;
    }

    .inputBlocks.qotes{
        display: flex;
    }

    .inputBlocks.qotes .inputBlock:nth-child(2),
    .inputBlocks.qotes .inputBlock:nth-child(3){
        margin-left: 20px;
    }

    .inputBlocks.qotes .inputBlock{
        margin-bottom: 0;
    }

    .inputBlocks.qotes .inputBlock input{
        font-size: 20px;
    }

    .lines .line:nth-child(2){
        margin-left: 30px;
    }

    .label.right{
        padding-right: 0;
    }

    .info{
        width: 40px;
        font-size: 16px;
    }

    .inputBlock.both .input{
        padding: 0 50px;
    }

    .inputBlock.left .input{
        padding-left: 50px;
    }

    .inputBlock.right .input{
        padding-right: 50px;
    }

    .input.value{
        font-size: 24px;
    }

    .input{
        padding: 0 10px;
    }

    .inputBlock.manager{
        width: calc(100% - 50px);
    }

    .clear{
        width: 40px;
        height: 40px;
    }
}

@media only screen and (max-width: 700px){
    .inputBlocks.qotes{
        display: block;
    }

    .inputBlocks.qotes .inputBlock:nth-child(2),
    .inputBlocks.qotes .inputBlock:nth-child(3){
        margin-left: 0;
        margin-top: 10px;
    }
}

@media only screen and (max-width: 639px){
    .title{
        padding: 10px 10px 0 10px;
        font-size: 14px;
    }

    .content{
        padding: 0px 10px 20px 10px;
    }

    .lines{
        flex-wrap: wrap;
    }

    .lines .line{
        width: 100%;
    }

    .lines .line:nth-child(2){
        margin-left: 0;
    }

    .label.right{
        text-align: left;
    }

    .inputBlocks.twolines .lines .line:nth-child(2){
        margin-left: 0;
        margin-top: 15px;
    }
}

@media only screen and (max-width: 479px){
    .input.value{
        font-size: 30px;
    }

    .input{
        font-size: 16px;
        padding: 0 10px;
    }
}
</style>