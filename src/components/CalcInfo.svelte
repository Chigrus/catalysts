<script>
    export let calcInfo;
    export let general;

    import { createEventDispatcher } from 'svelte';
    import { isAdmin } from '../store.js';

    import BtnEdit from '../components/BtnEdit.svelte';
    import { isEditor } from '../store.js';

    const dispatch = createEventDispatcher();
</script>

<div class="content">
    <div class="calcs">
        {#each calcInfo as item}
            <div class="block">
                {#if $isEditor}
                <BtnEdit
                    on:getData
                    dataEdit={item} 
                    fields={[
                        {field: 'title', type: 'input'},
                        {field: 'text', type: 'input'},
                    ]} 
                />
                {/if}
                <div class="title">{@html item.title}</div>
                <div class="text">{@html item.text}</div>
                {#if item.subtitle === 'calcCeramic' && $isAdmin}
                    <div class="btnCalcCeramic" on:click={() => dispatch('onCalcCeramic', {title: 'КЕРАМИЧЕСКИЕ КАТАЛИЗАТОРЫ', percent_factory: general[0].percent_factory, percent_profit: general[0].percent_profit})}>КАЛЬКУЛЯТОР</div>
                {/if}
                {#if item.subtitle === 'calcFilters' && $isAdmin}
                    <div class="btnCalcCeramic" on:click={() => dispatch('onCalcCeramic', {title: 'САЖЕВЫЕ ФИЛЬТРЫ', percent_factory: general[0].percent_factory, percent_profit: general[0].percent_profit})}>КАЛЬКУЛЯТОР</div>
                {/if}
            </div>
        {/each}
    </div>
</div>
<style>
.content{
    float: left;
    width: 100%;
    padding: 45px 0;
}

.calcs{
    float: left;
    width: 100%;
    display: flex;   
}

.block{
    position: relative;
    width: calc(100%/3);
    box-sizing: border-box;
    padding: 0 20px;
}

:global(.block .edit){
    right: 0 !important;
}

.title{
    width: 100%;
    font-size: 30px;
    color: #515252;
}

.text{
    width: 100%;
    margin-top: 10px;
    font-size: 22px;
    color: #999999;
    line-height: 1.5em;
}

.btnCalcCeramic{
    float: left;
    width: auto;
    border-radius: 5px;
    background-color: #515253;
    color: #ffca00;
    font-size: 16px;
    padding: 12px 20px 10px 20px;
    margin-top: 15px;
    line-height: 1em;
    letter-spacing: 3px;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
}

:global(.title b){
    font-family: MyriadPro-Bold;
    font-weight: normal;
}


@media only screen and (max-width: 1023px){

    .calcs{
        flex-wrap: wrap;
        margin-top: 20px;
    }
    .block{
        width: 100%;
        margin: 20px 0;
    }
}

@media only screen and (max-width: 479px){
    .content{
        padding-top: 0;
    }
    .title{
        font-size: 24px;
    }
    .text{
        font-size: 18px;
    }
}
</style>