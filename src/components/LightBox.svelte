<script>
    export let lightbox;

    function closeLightBopx() {
        lightbox.isOpen = false;
    }
</script>

<div class="glass" class:open="{lightbox.isOpen}">
    <div class="lightbox">
        <span class="close" on:click="{closeLightBopx}"></span>
        <img src="{lightbox.content}" alt="" />
    </div>
</div>

<style>
.glass{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
}

.glass.open{
    display: flex;
}

.lightbox{
    position: relative;
    width: max-content;
    max-width: 640px;
    height: max-content;
    max-height: 80vh;
    background-color: #fff;
    box-sizing: border-box;
    padding: 15px;
    padding-top: 35px;
    border-radius: 5px;
}

.close{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-image: url(/svg/close.svg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 18px 18px;
}
</style>