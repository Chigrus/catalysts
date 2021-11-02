<script>
    import { scrollto } from "svelte-scrollto";
    import Logo from '../components/Logo.svelte';
    import LightBox from '../components/LightBox.svelte';
    import DocsList from '../components/DocsList.svelte';

    export let logo;
    export let footerabout;
    export let menu;
    export let general;

    let lightbox = {
        isOpen: false,
        content: '',
    };

    let docsList = [
        {thumbnail: '/uploads//docs/1.jpg', image: '/uploads//docs/1.jpg'},
        {thumbnail: '/uploads//docs/2.jpg', image: '/uploads//docs/2.jpg'},
        {thumbnail: '/uploads//docs/3.jpg', image: '/uploads//docs/3.jpg'},
        {thumbnail: '/uploads//docs/4.jpg', image: '/uploads//docs/4.jpg'},
        {thumbnail: '/uploads//docs/5.jpg', image: '/uploads//docs/5.jpg'},
        {thumbnail: '/uploads//docs/6.jpg', image: '/uploads//docs/6.jpg'},
        {thumbnail: '/uploads//docs/7.jpg', image: '/uploads//docs/7.jpg'},
        {thumbnail: '/uploads//docs/8.jpg', image: '/uploads//docs/8.jpg'},
        {thumbnail: '/uploads//docs/9.jpg', image: '/uploads//docs/9.jpg'},
    ]

    function menuClick(id){
        menu.forEach(function(item, i) { 
            item.active = false; 
        });
        menu[id-1].active = true;
    }
</script>

<LightBox {lightbox} />

<div class="content">
    <div class="topLine">
        <div class="about">
            <div class="titleBlock"><Logo {logo} /></div>
            <div class="text">{@html footerabout[0].text}</div>
        </div>
        <div class="right">
            <div class="listBlock">
                <div class="titleBlock">
                    <h3>У нас на сайте</h3>
                </div>
                <ul class="list">
                    {#each menu as item}
                        <li class="item" on:click={() => menuClick(item.position)} use:scrollto={{ element: '#'+item.url, offset: -100 }}>{item.title}</li>
                    {/each}
                </ul>
            </div>
            <div class="listBlock">
                <div class="titleBlock">
                    <h3>Контакты</h3>
                </div>
                <div class="contacts">
                    <div class="contactLine">
                        <h4 class="contactTitle">Адрес:</h4>
                        <div class="contactText">{general[0].address}</div>
                    </div>
                    <div class="contactLine">
                        <h4 class="contactTitle">Телефон:</h4>
                        <div class="contactText">{general[0].phone}</div>
                    </div>
                    <div class="contactLine">
                        <h4 class="contactTitle">E-mail:</h4>
                        <div class="contactText">{general[0].email}</div>
                    </div>
                </div>
            </div>
            <div class="docs">
                <div class="titleBlock">
                    <h3>Документация</h3>
                </div>
                <DocsList on:setLightBox={(event) => { lightbox = event.detail; }} {docsList} />
            </div>
        </div>
    </div>
    <div class="bottomLine">
        <div class="social">
            <div class="titleBlock">
                <h3>Мы в соцсетях</h3>
            </div>
            <ul class="socList">
                <li class="socItem google"><a class="socLink" href="{general[0].google}">{general[0].google}</a></li>
                <li class="socItem yandex"><a class="socLink" href="{general[0].yandex}">{general[0].yandex}</a></li>
                <li class="socItem instagram"><a class="socLink" href="{general[0].instagram}">{general[0].instagram}</a></li>
                <li class="socItem youtube"><a class="socLink" href="{general[0].youtube}">{general[0].youtube}</a></li>
            </ul>
        </div>
        <div class="call">
            <div class="titleBlock">
                <h3>Вызвать специалиста бесплатно</h3>
            </div>
            <div class="callContainer">
                <div class="callTitle">Ежедневно с 9 до 16 часов</div>
                <a href="tel:89283111110" class="btnCall">Позвонить</a>
            </div>    
        </div>
    </div>
</div>

<style>
.content{
    float: left;
    width: 100%;
    padding: 100px 0 45px 0;
    border-top: 1px dashed #dddddd;
}

.topLine,
.bottomLine{
    float: left;
    width: 100%;
}

.bottomLine{
    margin-top: 30px;
}

.about{
    float: left;
    width: 330px;
    margin-right: 60px;
}

.right{
    float: right;
}

.titleBlock{
    float: left;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: flex-end;   
}

.titleBlock h3{
    font-size: 25px;
    color: #515252;
}

.text{
    float: left;
    width: 100%;
    color: #333333;
    font-size: 17px;
    line-height: 1.5em;
    margin-top: 15px;
}

.listBlock{
    float: left;
    width: 200px;
    margin-left: 35px;
}

.list{
    float: left;
    width: 100%;
    margin: 0;
    padding: 0;
    margin-top: 15px;
    list-style-type: none;
}

.item{
    position: relative;
    float: left;
    width: 100%;
    box-sizing: border-box;
    padding-left: 15px;
    margin-top: 15px;
    font-size: 17px;
    color: #333333;
    cursor: pointer;
}

.item:hover{
    color: #ffca00;
}

.item::before{
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border: 6px solid transparent; 
    border-left: 5px solid #ffca00;
    margin-top: -8px;
}

.docs{
    float: left;
    width: 256px;
    margin-left: 35px;
}

.social{
    float: left;
    width: 330px;
    margin-right: 60px;
}

.call{
    float: left;
    width: calc(100% - 390px);
}

.contacts{
    float: left;
    width: 100%;
    margin-top: 15px;
}

.contactLine{
    float: left;
    width: 100%;
    margin-top: 15px;
}

.contactTitle{
    position: relative;
    float: left;
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
}

.contactTitle::before{
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border: 6px solid transparent;
    border-left: 5px solid #ffca00;
    margin-top: -8px;
}

.contactText{
    float: left;
    width: 100%;
    line-height: 1.2em;
    margin-top: 10px;
}

.socList{
    float: left;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style-type: none;
    margin-top: 35px;
}

.socItem{
    float: left;
    margin-right: 10px;
}

.socLink{
    display: block;
    width: 60px;
    height: 60px;
    background-color: #f9f9f9;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 20px 20px;
    border-radius: 50%;
    font-size: 0;
}

.socItem.instagram .socLink{
    background-image: url(/svg/instagram.svg);
}
.socItem.yandex .socLink{
    background-image: url(/svg/yandex.svg);
}
.socItem.youtube .socLink{
    background-image: url(/svg/youtube.svg);
}

.callContainer{
    float: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background-color: #f9f9f9;
    margin-top: 35px;
    border-radius: 60px;
    box-sizing: border-box;
    padding-left: 30px;
}

.callTitle{
    color: #cccccc;
    font-size: 20px;
}

.btnCall{
    display: flex;
    align-items: center;
    height: 100%;
    border-radius: 60px;
    background-color: #ffc802;
    font-size: 16px;
    color: #fff;
    letter-spacing: 2px;
    padding: 0 45px;
    text-decoration: none;
    cursor: pointer;
}

@media only screen and (max-width: 1199px){
    .about{
        width: 100%;
        margin-right: 0;
    }

    .right{
        float: left;
        width: 100%;
        margin-top: 10px;
    }

    .listBlock{
        margin-left: 0;
    }
}

@media only screen and (max-width: 1023px){
    .social{
        width: 100%;
        margin-right: 0;
    }

    .socList{
        margin-top: 20px;
    }

    .call{
        width: 100%;
        margin-top: 20px;
    }

    .callContainer{
        margin-top: 20px;
    }
}

@media only screen and (max-width: 767px){
    .docs{
        width: 100%;
        margin-left: 0;
        margin-top: 25px;
    }
}

@media only screen and (max-width: 479px){
    .content{
        padding: 45px 0 45px 0;
    }

    .listBlock{
        width: 100%;
        margin-left: 0;
        margin-bottom: 20px;
    }
}
</style>