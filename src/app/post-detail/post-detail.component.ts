import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postId!: number; // Используем "!" для указания на то, что мы уверены в инициализации
  post!: Post; // То же здесь

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.postService.getPostById(this.postId).subscribe(post => {
        this.post = post;
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}





