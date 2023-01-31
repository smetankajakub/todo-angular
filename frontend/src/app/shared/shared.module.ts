import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioFilterPipe } from './pipes/radio-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

@NgModule({
  declarations: [RadioFilterPipe, SearchFilterPipe],
  imports: [CommonModule],
  exports: [RadioFilterPipe, SearchFilterPipe],
})
export class SharedModule {}
