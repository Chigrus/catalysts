<script>
    export let catalog;
    export let catalogList;
    export let centerSlide = 1;
    let curentSlide = 0;
    import Carousel from '@beyonk/svelte-carousel';
    import CatalogList from '../components/CatalogList.svelte';

    function werwt(slide){
        curentSlide = slide.detail.currentSlide;
        centerSlide = curentSlide+1;
    }
</script>

<div class="content">
    {#each catalog as item}
    <div class="subtitle">{@html item.subtitle}</div>
    <div class="title"><h2>{@html item.title}</h2></div>
    {/each}
    <div class="slider cat">
        <Carousel perPage={{ 1024: 3, 768: 1 }} loop={false} on:change="{ werwt }">
            <CatalogList {catalogList} {centerSlide} />
        </Carousel>
    </div>
</div>
<style>
.content{
    float: left;
    width: 100%;
    padding: 120px 0;
}

.subtitle{
    float: left;
    width: 100%;
    text-align: center;
    color: #ffc926;
    font-size: 33px;
    font-family: SegoeScript-Regular;
}

.title{
    float: left;
    width: 100%;
    text-align: center;
    margin-top: 20px;
}

.title h2{
    font-size: 55px;
    color: #515252;
    line-height: 1.2em;
    font-weight: normal;
    font-family: MyriadPro-Bold;
    text-transform: uppercase;
}

.slider{
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    float: left;
    width: 100%;
    margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
}

:global(.slider .carousel .slides){
    position: relative;
    padding: 50px 0;
}

:global(.slider .carousel ul){
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
}

:global(.slider .carousel ul li){
    background-color: #eeeeee;
    cursor: pointer;
    width: 10px;
    height: 10px;
    border-radius: 10px;
}

:global(.slider .carousel ul li.active){
    width: 40px;
    background-color: #ffbd0a;
}

@media only screen and (max-width: 1023px){
    :global(.slider.cat .carousel){
        width: 400px !important
    }
}

@media only screen and (max-width: 639px){
    .title h2{
        font-size: 36px;
    }
}

@media only screen and (max-width: 479px){
    .content{
        padding: 60px 0;
    }

    .title h2{
        font-size: 28px;
    }

    :global(.slider .carousel){
        width: 280px !important
    }
}
</style>