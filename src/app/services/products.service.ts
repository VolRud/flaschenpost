import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http'
import {catchError, delay, Observable, retry, tap, throwError} from 'rxjs'
import {IArticle, ICompletedArticle, IProduct} from '../models/product'
import {ErrorService} from './error.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }
  unfiltredProduts: ICompletedArticle[] = []
  products: ICompletedArticle[] = []

  getAll(): Observable<IProduct[]> {
    // to do create file with constants of endpoints
    return this.http.get<IProduct[]>('https://flapotest.blob.core.windows.net/test/ProductData.json', {
      params: new HttpParams({
        fromObject: {limit: 5}
      })
    }).pipe(
      tap(products => {
        this.products = getCompletedArticlesOfProduts(products);
        this.unfiltredProduts = this.products;
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  clearFilterAndSort() {
    this.products = this.unfiltredProduts;
  }

sortProducts(sortType :string) :void{
    this.products = this.products.sort((prev, next) => {
      return sortType === 'descending'
       ? next.priceAsNumber - prev.priceAsNumber
       : prev.priceAsNumber - next.priceAsNumber;
    });
  }

  getProductsMoreExpensiveThan(rangeMin :number) {
    rangeMin === 0
    ? this.clearFilterAndSort()
    : this.products = this.products.filter(item => item.priceAsNumber >=2);
  }
  
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

const getCompletedArticlesOfProduts = (allProducts :IProduct[]) => {
  if (allProducts.length===0) return [];
  return allProducts.reduce((resArr :ICompletedArticle[], item :IProduct) => {
    const completedArticles :ICompletedArticle[] = item.articles.map((article :IArticle) => {
      return {
        ...article,
        name: item.name,
        brandName: item.brandName,
        priceAsNumber: getPriceAsNumber(article.pricePerUnitText)
      }
    });
    return [...resArr, ...completedArticles];
  }, [])
}

const parseStringForNumber = (str :string) => {
  return parseInt(str.replace(/[^\d]/g, ''));
}

const getPriceAsNumber = (str :string) => {
  return parseStringForNumber(str)/100;
}
