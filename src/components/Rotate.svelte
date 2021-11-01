<script>
    //export let calcCeramics;

    let i = 1;
    const frames = 52;

    let oldx = 0;
    let ismouseDown = false;

    function onWheel(e) {
        e = e || window.event;

        let delta = e.deltaY || e.detail || e.wheelDelta;

        if(delta > 0){
            i < frames ? i++ : i = 1;
        }
        else{
            i > 1 ? i-- : i = frames;
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
	}

    function onTouchmove(e){
        let mx = e.changedTouches[0].clientX;
        
        if (mx > oldx) {
            i < frames ? i++ : i = 1;
        } else{
            i > 1 ? i-- : i = frames;
        }
        oldx = mx;
    }

    function onMousedown(e){
        ismouseDown = true;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        return ismouseDown;
    }

    function onMouseup(e){
        ismouseDown = false;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        return ismouseDown;
    }

    function onMousemove(e){
        let mx = e.offsetX;
        
        if(ismouseDown){
            if (mx > oldx) {
                i < frames ? i++ : i = 1;
            } else{
                i > 1 ? i-- : i = frames;
            }
            oldx = mx;
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

</script>

<div class="rotate" on:mousewheel={onWheel} on:touchmove={onTouchmove} on:mousemove={onMousemove} on:mousedown={onMousedown} on:mouseup={onMouseup}>
    <img src="uploads/car/{i}.png" alt="car" />
</div>

<style>
.rotate{
    width: 1000px;
    height: 447px;
    background-color: rgba(0,0,0,0.1);
}

.rotate img{
    width: 100%;
    height: auto;
}
</style>