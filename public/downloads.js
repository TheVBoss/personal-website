(()=>{
const button=document.querySelector('#download-fusion'),status=document.querySelector('#download-status');
button.addEventListener('click',async()=>{
 button.disabled=true;button.setAttribute('aria-busy','true');status.textContent='Preparing your Fusion files…';
 try{
  const index=await fetch('downloads/fusion.json');if(!index.ok)throw Error();const manifest=await index.json(),parts=[];let loaded=0;
  for(const file of manifest.files){const response=await fetch('downloads/'+file);if(!response.ok)throw Error();const data=await response.arrayBuffer();parts.push(data);loaded+=data.byteLength;status.textContent='Downloading Fusion files… '+Math.round(loaded/manifest.size*100)+'%'}
  if(loaded!==manifest.size)throw Error();
  const blob=new Blob(parts,{type:'application/zip'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='BMO-Fusion-Files.zip';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);status.textContent='Your download is ready. Unzip it to access the Fusion designs.';
 }catch{status.textContent='The download could not finish. Please try again.'}finally{button.disabled=false;button.removeAttribute('aria-busy')}
});
})();
