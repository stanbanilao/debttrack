(function(){
  const seeded = {
    org: { id:'org-thynk', name:'ThynkDebt', whatsapp:'+27210000000', support:'Support Team' },
    clients: [
      {
        id:'c1', ref:'DR-24081', fullName:'Sipho Ndlovu', idNumber:'8501015000081', mobile:'072 555 0181', counsellor:'Nadia Jacobs', org:'ThynkDebt', currentStage:'Form 17.2', updateRequested:false, inviteStatus:'Opened', lastUpdated:'08 Sep 2026, 14:32', token:'demo-sipho-8f13',
        journey:[
          ['Application Received','done','02 Sep 2026','Your debt review file was created.'],
          ['Form 16','done','03 Sep 2026','Application stage recorded by the debt counsellor.'],
          ['Form 17.1','done','04 Sep 2026','Notification stage completed.'],
          ['Form 17.2','current','08 Sep 2026','This is the current status shown by your debt counsellor.'],
          ['Legal Prep','todo','','This step has not started yet.'],
          ['Court Order / D4','todo','','This step has not started yet.']
        ]
      },
      {
        id:'c2', ref:'DR-24082', fullName:'Lerato Mofokeng', idNumber:'9205155000082', mobile:'073 555 2944', counsellor:'Nadia Jacobs', org:'ThynkDebt', currentStage:'Rework', updateRequested:true, inviteStatus:'Opened', lastUpdated:'07 Sep 2026, 09:10', token:'demo-lerato-31b2',
        journey:[
          ['Application Received','done','30 Aug 2026','Your debt review file was created.'],
          ['Form 16','done','31 Aug 2026','Application stage recorded by the debt counsellor.'],
          ['Form 17.1','done','01 Sep 2026','Notification stage completed.'],
          ['Rework','current','07 Sep 2026','Your file requires an admin correction or additional information.'],
          ['Form 17.2','todo','','Pending completion of rework.'],
          ['Legal Prep','todo','','This step has not started yet.']
        ]
      },
      {
        id:'c3', ref:'DR-24083', fullName:'Johan van der Merwe', idNumber:'7812205000083', mobile:'082 555 4411', counsellor:'Ethan Adams', org:'ThynkDebt', currentStage:'D4 Court Order', updateRequested:false, inviteStatus:'Opened', lastUpdated:'05 Sep 2026, 16:45', token:'demo-johan-a429',
        journey:[
          ['Application Received','done','14 Aug 2026','Your debt review file was created.'],
          ['Form 16','done','15 Aug 2026','Application stage recorded by the debt counsellor.'],
          ['Form 17.1','done','17 Aug 2026','Notification stage completed.'],
          ['Form 17.2','done','20 Aug 2026','Status recorded.'],
          ['Legal Prep','done','28 Aug 2026','Legal preparation stage completed.'],
          ['D4 Court Order','current','05 Sep 2026','Current legal status recorded by your debt counsellor.']
        ]
      },
      {
        id:'c4', ref:'DR-24084', fullName:'Amina Patel', idNumber:'8103055000084', mobile:'076 555 3018', counsellor:'Ethan Adams', org:'RemedyDebt', currentStage:'Form 16', updateRequested:false, inviteStatus:'Sent', lastUpdated:'08 Sep 2026, 11:05', token:'demo-amina-214f',
        journey:[
          ['Application Received','done','08 Sep 2026','Your debt review file was created.'],
          ['Form 16','current','08 Sep 2026','Current application stage.'],
          ['Form 17.1','todo','','This step has not started yet.'],
          ['Form 17.2','todo','','This step has not started yet.'],
          ['Legal Prep','todo','','This step has not started yet.'],
          ['Court Order / D4','todo','','This step has not started yet.']
        ]
      },
      {
        id:'c5', ref:'DR-24085', fullName:'David Smith', idNumber:'9508225000085', mobile:'079 555 5522', counsellor:'Aisha Peters', org:'RemedyDebt', currentStage:'Legal Prep', updateRequested:false, inviteStatus:'Not sent', lastUpdated:'06 Sep 2026, 12:25', token:'demo-david-9d02',
        journey:[
          ['Application Received','done','20 Aug 2026','Your debt review file was created.'],
          ['Form 16','done','21 Aug 2026','Application stage recorded.'],
          ['Form 17.1','done','22 Aug 2026','Notification stage completed.'],
          ['Form 17.2','done','26 Aug 2026','Status recorded.'],
          ['Legal Prep','current','06 Sep 2026','Current legal preparation status.'],
          ['Court Order / D4','todo','','This step has not started yet.']
        ]
      }
    ]
  };
  const KEY='thynkdebttrack_demo_v1';
  function clone(x){return JSON.parse(JSON.stringify(x))}
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||clone(seeded)}catch(e){return clone(seeded)}}
  function save(data){localStorage.setItem(KEY,JSON.stringify(data)); try{new BroadcastChannel('thynkdebttrack').postMessage({type:'refresh'})}catch(e){}}
  function reset(){localStorage.removeItem(KEY);return load()}
  function maskId(id){return id.slice(0,6)+'••••'+id.slice(-3)}
  window.DebtDemo={load,save,reset,maskId,seeded:clone(seeded)};
})();
