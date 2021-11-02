<script>
    export let subheader;
</script>

<div class="content">
    {#each subheader as item}
        <div class="title">{item.title}</div>
        <div class="subtitle">{item.subtitle}</div>
    {/each}
</div>

<style>
.content{
    float: left;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 90px 0;
}

.title{
    width: 100%;
    max-width: 720px;
    text-align: center;
    font-size: 42px;
    color: #515252;
    letter-spacing: 3px;
}

.subtitle{
    width: 100%;
    text-align: center;
    margin-top: 75px;
    font-size: 16px;
    color: #ffb50f;
	font-family: MyriadPro-Semibold;
}

@media only screen and (max-width: 1023px){
    .title{
        font-size: 36px;
    }

    .subtitle{
        margin-top: 50px;
    }
}

@media only screen and (max-width: 639px){
    .title{
        font-size: 26px;
    }

    .subtitle{
        margin-top: 30px;
    }
}

@media only screen and (max-width: 479px){
    .content{
        padding: 45px 0;
    }
    .title{
        font-size: 20px;
    }
}
</style>