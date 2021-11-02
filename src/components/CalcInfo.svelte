<script>
    export let calcInfo;

    import Carousel from '@beyonk/svelte-carousel';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<div class="content">
    <div class="slider">
        <Carousel perPage={{ 1200: 3, 768: 1 }}>
            {#each calcInfo as item}
                <div class="block">
                    <div class="title">{@html item.title}</div>
                    <div class="text">{@html item.text}</div>
                    {#if item.subtitle === 'calcCeramic'}
                        <div class="btnCalcCeramic" on:click={() => dispatch('onCalcCeramic')}>КАЛЬКУЛЯТОР</div>
                    {/if}
                </div>
            {/each}
        </Carousel>
    </div>
</div>
<style>
.content{
    float: left;
    width: 100%;
    padding: 45px 0;
}

.block{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
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