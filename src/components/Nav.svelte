<script>
    import { scrollto } from "svelte-scrollto";
    export let menu;

    function menuClick(id){
        menu.forEach(function(item, i) { 
            item.active = false; 
        });
        menu[id-1].active = true;
    }
</script>

<ul class="mainmenu">
    {#each menu as item}
        <li class="item" class:active={item.active}>
            <a href="#about" class="link" on:click|preventDefault={() => menuClick(item.position)} use:scrollto={{ element: '#'+item.url, offset: -100 }}>{item.title}</a>
            <!-- <a href="#about" class="link" on:click|preventDefault={() => menuClick(item.position)} use:scrollto={'#'+item.url }>{item.title}</a> -->
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
</style>