var subject = new Rx.Subject();

subject.onNext(1);

subject.subscribe(function(n) {
  console.log('Received value:', n);
});

subject.onNext(2);
subject.onNext(3);
