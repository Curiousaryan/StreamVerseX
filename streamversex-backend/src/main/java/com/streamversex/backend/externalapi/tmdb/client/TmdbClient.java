package com.streamversex.backend.externalapi.tmdb.client;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.streamversex.backend.externalapi.tmdb.dto.TmdbCreditsResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbGenreListResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMovieDetailsDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMoviePageResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbTvDetailsDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbTvPageResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbVideoResponse;

import lombok.RequiredArgsConstructor;

@Component
public class TmdbClient {

	private final RestClient restClient;

    public TmdbClient(
            @Qualifier("tmdbRestClient") RestClient restClient) {

        this.restClient = restClient;
    }

    // ==================== TRENDING ====================

    public TmdbMoviePageResponse getTrendingMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/trending/movie/week")
                        .queryParam("language", "en-US")
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== POPULAR ====================

    public TmdbMoviePageResponse getPopularMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/popular")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== TOP RATED ====================

    public TmdbMoviePageResponse getTopRatedMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/top_rated")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== UPCOMING ====================

    public TmdbMoviePageResponse getUpcomingMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/upcoming")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }


    // ==================== NOW PLAYING ====================

    public TmdbMoviePageResponse getNowPlayingMovies() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/now_playing")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }
    
 // ==================== MOVIE DETAILS ====================

    public TmdbMovieDetailsDTO getMovieDetails(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}")
                        .queryParam("language", "en-US")
                        .build(movieId))
                .retrieve()
                .body(TmdbMovieDetailsDTO.class);
    }
    
 // ==================== SEARCH MOVIES ====================

    public TmdbMoviePageResponse searchMovies(String query) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/movie")
                        .queryParam("query", query)
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .queryParam("include_adult", false)
                        .build())
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }
    
 // ==================== MOVIE GENRES ====================

    public TmdbGenreListResponse getMovieGenres() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/genre/movie/list")
                        .queryParam("language", "en-US")
                        .build())
                .retrieve()
                .body(TmdbGenreListResponse.class);
    }
    
 // ==================== MOVIE CREDITS ====================

    public TmdbCreditsResponse getMovieCredits(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}/credits")
                        .queryParam("language", "en-US")
                        .build(movieId))
                .retrieve()
                .body(TmdbCreditsResponse.class);
    }
    
 // ==================== MOVIE VIDEOS ====================

    public TmdbVideoResponse getMovieVideos(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}/videos")
                        .queryParam("language", "en-US")
                        .build(movieId))
                .retrieve()
                .body(TmdbVideoResponse.class);
    }
    
 // ==================== MOVIE RECOMMENDATIONS ====================

    public TmdbMoviePageResponse getMovieRecommendations(Long movieId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movieId}/recommendations")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build(movieId))
                .retrieve()
                .body(TmdbMoviePageResponse.class);
    }
    
 // ==================== TRENDING TV ====================

    public TmdbTvPageResponse getTrendingTvShows() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/trending/tv/week")
                        .queryParam("language", "en-US")
                        .build())
                .retrieve()
                .body(TmdbTvPageResponse.class);
    }
    
 // ==================== POPULAR TV ====================

    public TmdbTvPageResponse getPopularTvShows() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/popular")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbTvPageResponse.class);
    }


    // ==================== TOP RATED TV ====================

    public TmdbTvPageResponse getTopRatedTvShows() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/top_rated")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbTvPageResponse.class);
    }


    // ==================== ON AIR TV ====================

    public TmdbTvPageResponse getOnAirTvShows() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/on_the_air")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbTvPageResponse.class);
    }


    // ==================== AIRING TODAY ====================

    public TmdbTvPageResponse getAiringTodayTvShows() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/airing_today")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .body(TmdbTvPageResponse.class);
    }
    
    
 // ==================== SEARCH TV ====================

    public TmdbTvPageResponse searchTvShows(String query) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/tv")
                        .queryParam("query", query)
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .queryParam("include_adult", false)
                        .build())
                .retrieve()
                .body(TmdbTvPageResponse.class);
    }


    // ==================== TV GENRES ====================

    public TmdbGenreListResponse getTvGenres() {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/genre/tv/list")
                        .queryParam("language", "en-US")
                        .build())
                .retrieve()
                .body(TmdbGenreListResponse.class);
    }
    
 // ==================== TV DETAILS ====================

    public TmdbTvDetailsDTO getTvDetails(Long tvId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/{tvId}")
                        .queryParam("language", "en-US")
                        .build(tvId))
                .retrieve()
                .body(TmdbTvDetailsDTO.class);
    }
    
 // ==================== TV CREDITS ====================

    public TmdbCreditsResponse getTvCredits(Long tvId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/{tvId}/credits")
                        .queryParam("language", "en-US")
                        .build(tvId))
                .retrieve()
                .body(TmdbCreditsResponse.class);
    }
    
 // ==================== TV VIDEOS ====================

    public TmdbVideoResponse getTvVideos(Long tvId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/{tvId}/videos")
                        .queryParam("language", "en-US")
                        .build(tvId))
                .retrieve()
                .body(TmdbVideoResponse.class);
    }


    // ==================== TV RECOMMENDATIONS ====================

    public TmdbTvPageResponse getTvRecommendations(Long tvId) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/{tvId}/recommendations")
                        .queryParam("language", "en-US")
                        .queryParam("page", 1)
                        .build(tvId))
                .retrieve()
                .body(TmdbTvPageResponse.class);
    }
}