import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  user = {
    nama: 'Tarri Peritha Westi',
    email: 'tarriperithawesti9009@gmail.com',
    nohp: '0812-6910-3035',
    role: '22040175',
    note: 'Project UAS Semester 6',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ07ru4H32ioJbA3r8gxkkEnGGk_CGqZZlwGw&s',
  };
}
