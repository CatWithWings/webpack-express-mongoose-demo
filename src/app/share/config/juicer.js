import juicer from 'juicer';

export function resetJuicerConf(){
    juicer.set({
        'tag::interpolateOpen': '#{',
        'tag::noneencodeOpen': '##{'
    });
}