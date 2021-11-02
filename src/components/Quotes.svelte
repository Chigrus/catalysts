<script>
    export let title;
    export let qotes;
</script>

<div class="content">
    <div class="title">{@html title}</div>
    <div class="qotes">
    {#each qotes as item}
        <div class="qote">
            <div class="name">{item.title}</div>
            <div class="value">{item.value} за гр.</div>
        </div>
    {/each}
    </div>
</div>
<style>
.content{
    float: left;
    width: 100%;
    padding: 120px 0;
}

.title{
    position: relative;
    float: left;
    width: 190px;
    height: 120px;
    color: #515252;
    font-size: 30px;
    font-family: MyriadPro-Bold;
    box-sizing: border-box;
    padding-top: 15px;
}

.title::after{
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 4px;
    height: 40px;
    background-color: #ffcd10;
}

.qotes{
    float: left;
    width: calc(100% - 190px);
    display: flex;
}

.qote{
    position: relative;
    width: calc(100%/3);
    height: 120px;
    background-color: #f9f9fb;
    margin-left: 15px;
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    align-items: flex-end;
}

.name{
    position: absolute;
    left: 15px;
    top: 15px;
    font-size: 30px;
    color: #515252;
    text-transform: uppercase;
}

.value{
    font-size: 25px;
    color: #ffcb00;
    line-height: 1em;
}

@media only screen and (max-width: 1023px){
    .title{
        width: 100%;
        height: auto;
        padding-top: 15px;
    }

    :global(.title br){
        display: none;
    }

    .title::after{
        right: auto;
        left: 0;
        bottom: 0;
        width: 40px;
        height: 4px;
    }

    .qotes{
        width: 100%;
        margin-top: 40px;
    }
}

@media only screen and (max-width: 767px){
    .qotes{
        flex-wrap: wrap;
    }

    .qote{
        width: 100%;
        margin: 10px 0;
    }
}

@media only screen and (max-width: 479px){
    .content{
        padding: 60px 0;
    }
}
</style>