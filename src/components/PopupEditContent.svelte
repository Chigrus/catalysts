<script>
    import { createEventDispatcher } from 'svelte';

    import Button from '../components/Button.svelte';
    
    export let content = [];

    const dispatch = createEventDispatcher();
    let data = [];

    content.fields.forEach(function(item){
        if(item.type == 'input'){
            data.push({ field: item.field, type: item.type, value: content.data[item.field] });
        }
    });

    function closePopup(){
        content.popup = false;
    }

    function saveData(){
        data.forEach(function(dataLine){
            content.data[dataLine.field] = dataLine.value;
        });

        fetch('/saveposts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: content.data
            })
        })
        .then(response => response.json())
        .then(data => {
            dispatch('updateData', {
                id: content.data.id
            });
            closePopup();              
        });
    }
</script>

<div class="glass">
    <div class="popup">
        <span class="close" on:click={closePopup}></span>
        <div class="content">
            {#each data as line}
                <div class="line">
                    {#if line.type == 'input'}
                        <input class="input" type="text" bind:value="{line.value}" />
                    {/if}
                    <!-- {#if line.type == 'textarea'}
                        <VisualEditor bind:textEditor={line.value} />
                    {/if}
                    {#if line.type == 'image'}
                        <div class="cropper">
                            <Cropper 
                                image={!imgFile ? line.value : imgFile}
                                crop={{ x: 0, y: 0 }}
                                zoom={1}
                                minZoom={0.8}
                                maxZoom={2}
                                cropSize = {{ width: 400, height: 400 }}
                                zoomSpeed={0.1}
                                restrictPosition={false}
                                on:cropcomplete={(event) => cropData = event.detail.pixels}
                            />
                        </div>
                        <div class="imgInfo">
                            <ButtonUploadFile bind:imgFile />
                            <input class="imgName" bind:value={line.alt} placeholder="Название картинки" />
                        </div>
                    {/if} -->
                </div>
            {/each}
        </div>
        <div class="controlsline">
            <Button title="Сохранить" on:click={saveData} />
        </div>
    </div>
</div>

<style>
.glass{
    position: fixed;
    z-index: 110;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.popup{
    position: relative;
    width: calc(100% - 40px);
    max-width: 640px;
    box-sizing: border-box;
    padding: 50px 20px 20px 20px;
    background-color: #fff;
}

.close{
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    background-image: url(/svg/close.svg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
}

.content{
    float: left;
    width: 100%;
    padding-top: 10px;
}

.line{
    float: left;
    width: 100%;
    margin-bottom: 15px;
}

.line:last-child{
    margin-bottom: 0;
}

.input{
    float: left;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    outline: none;
}

.controlsline{
    float: left;
    width: 100%;
    margin-top: 15px;
    text-align: right;
}

/* .cropper{
    position: relative;
    float: left;
    width: 100%;
    height: 460px;
    overflow: hidden;
    margin-bottom: 5px;
}

.imgInfo{
    float: left;
    width: 100%;
    display: flex;
    align-items: center;
}

.imgName{
    flex-grow: 1;
    height: 34px;
    box-sizing: border-box;
    margin-left: 15px;
    padding: 0 10px;
    outline: none;
    border: 1px solid rgba(0,0,0,0.5);
} */
</style>