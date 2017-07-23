import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-index-comparision',
  templateUrl: './index-comparision.component.html',
  styleUrls: ['./index-comparision.component.css']
})
export class IndexComparisionComponent implements OnInit {

  amountRaised = 500;
  rb_pf;
  rb_cpf;
  rb_total;
  jg_pf;
  jg_cpf;
  jg_total;
  gfm_pf;
  gfm_cpf;
  gfm_total;

  constructor() {
  }

  ngOnInit() {
    this.rb_pf = this.amountRaised * 0.015;
    this.rb_cpf = this.amountRaised * 0.014 + 0.20;
    this.rb_total = this.amountRaised - (this.rb_pf + this.rb_cpf);

    this.jg_pf = this.amountRaised * 0.05;
    this.jg_cpf = this.amountRaised * 0.0125;
    this.jg_total = this.amountRaised - (this.jg_pf + this.jg_cpf);

    this.gfm_pf = this.amountRaised * 0.05;
    this.gfm_cpf = this.amountRaised * 0.035 + 0.20;
    this.gfm_total = this.amountRaised - (this.gfm_pf + this.gfm_cpf);
  }

}
