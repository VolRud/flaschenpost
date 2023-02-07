import {Component, Input} from '@angular/core'
import {ICompletedArticle, IProduct} from '../../models/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: ICompletedArticle
  @Input() viewMode: {
    listWithDetails :boolean,
    listOfPhotos :boolean
  }

}
