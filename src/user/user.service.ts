import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private dummyData = [
    { id: 1, name: 'Danyal Ahmed' },
    { id: 2, name: 'Shafique Ahmed' },
    { id: 3, name: 'Aneeb Ahmed Khan' },
    { id: 4, name: 'Hamza Yasir' },
    { id: 5, name: 'Faheel Ahmed' },
    { id: 6, name: 'Demo User Testing' },
  ];
}
