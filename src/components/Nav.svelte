<script>
    import * as animateScroll from "svelte-scrollto";
    export let menu;
    export let isMobileMenu;

    function menuClick(id, url){
        menu.forEach(function(item, i) { 
            item.active = false; 
        });
        menu[id-1].active = true;

        animateScroll.scrollTo({element: '#'+url, offset: -100});

        isMobileMenu = false;
    }
</script>

<ul class="mainmenu">
    {#each menu as item}
        <li class="item" class:active={item.active}>
            <a href="#about" class="link" on:click|preventDefault={() => menuClick(item.position, item.url)}>{item.title}</a>
        </li>
    {/each}
</ul>

<style>
.mainmenu{
   display: flex;
   align-items: center;
   list-style-type: none;
}

.item{
    position: relative;
    margin: 0;
    padding: 0;
    margin-right: 40px;
    user-select: none;
}

.item.active a{
    color: #ffca00;
}

.item.active::before{
    content: '';
    position: absolute;
    left: -15px;
    bottom: -10px;
    width: 40px;
    height: 1px;
    background-color: #dddddd;
}

.item:last-child{
    margin-right: 0;
}

.link{
    color: #878787;
    font-size: 16px;
    text-transform: uppercase;
	font-family: MyriadPro-Cond;
    letter-spacing: 1px;
    text-decoration: none;
}

@media only screen and (max-width: 1023px){
    .item{
        margin-right: 20px;
    }
}

@media only screen and (max-width: 639px){
    .mainmenu{
        width: 300px;
        flex-wrap: wrap;
        padding: 0;
    }

    .item{
        width: 100%;
        margin: 5px 0;
    }

    .item.active::before{
        left: 50%;
        bottom: -7px;
        margin-left: -20px;
    }

    .link{
        display: block;
        text-align: center;
        font-size: 20px;
        padding: 10px 0;
    }
}
</style>