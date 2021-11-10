<script>
    import { goto } from '@sapper/app';

    let data = [
        {
            name: 'login',
            placeholder: 'Ваш логин',
            type: 'text',
            value: '',
            class: 'input',
            error: false,
            erEmpty: { isShow: false, title: 'Введите логин' }
        },
        {
            name: 'password',
            placeholder: 'Ваш пароль',
            type: 'password',
            value: '',
            class: 'input',
            error: false,
            erEmpty: { isShow: false, title: 'Введите пароль' }
        }
    ]

    function authorization(){
        console.log(111);
        let erCount = 0;
        data.forEach(function(item, i){
            if (item.value == '') {
                data[i].error = true;
                data[i].erEmpty.isShow = true;
                erCount++;
            }
        });
        if (erCount === 0){
            let user = {};

            data.forEach(function(item, i){
                user[[item.name]] = item.value;
            });

            //console.log(user);

            fetch('/authorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: user
                })
            })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                goto('/');              
            });
        }
    }

    function onFocus(i){
        data[i].error = false;
        data[i].erEmpty.isShow = false;
    }

</script>

<svelte:head>
	<title>Авторизация</title>
</svelte:head>

<div class="containerAdmin">
	<div class="formAdmin">
        {#each data as line, i}
            {#if line.type == 'text'}
                <div class="lineForm">
                    <span class="titleError">{line.erEmpty.isShow ? line.erEmpty.title : ''}</span>
                    <input class="{line.class}" class:error={line.error} bind:value="{line.value}" on:focus={() => onFocus(i)} placeholder="{line.placeholder}" type="text" />
                </div>
            {/if}
            {#if line.type == 'password'}
                <div class="lineForm">
                    <span class="titleError">{line.erEmpty.isShow ? line.erEmpty.title : ''}</span>
                    <input class="{line.class}" class:error={line.error} bind:value="{line.value}" on:focus={() => onFocus(i)} placeholder="{line.placeholder}" type="password" />
                </div>
            {/if}
        {/each}
        <div class="lineForm">
            <div class="login" on:click={authorization}>Войти</div>
        </div>
	</div>
</div>

<style>
.containerAdmin{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.formAdmin{
    width: 480px;
    max-width: calc(100% - 20px);
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #423232;
    border-radius: 5px;
    padding-top: 200px;
    background-image: url(/img/bird.png);
    background-position: top 20px center;
    background-repeat: no-repeat;
    background-size: 180px auto;
    -webkit-box-shadow: 0px 1px 14px 0px rgba(50, 50, 50, 0.2);
	-moz-box-shadow: 0px 1px 14px 0px rgba(50, 50, 50, 0.2);
	box-shadow: 0px 1px 14px 0px rgba(50, 50, 50, 0.2);
}

.input{
    width: 100%;
    height: 40px;
    outline: none;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid #423232;
    border-radius: 3px;
}

.input.error{
    border: 1px solid #ee3f02;
}

.lineForm{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.lineForm:last-child{
    margin-bottom: 0;
}

.titleError{
    position: absolute;
    top: -16px;
    right: 0;
    color: #ee3f02;
    font-size: 12px;
}

.login{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 34px;
    background-color: #515253;
    color: #ffca00;
    border-radius: 5px;
    cursor: pointer;
}
</style>